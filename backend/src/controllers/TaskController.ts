import type { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body)
      task.project = req.project._id
      req.project.tasks.push(task._id)
      await Promise.allSettled([ task.save(), req.project.save() ])
      res.send("Tarea agregada!")
    } catch (error) {
      console.log(error)
    }
  }

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project._id }).populate('project')
      res.json(tasks)
    } catch (error) {
      console.log(error)
    }
  }

  static getTaskById = async (req: Request, res: Response) => {
    const { taskId } = req.params
    try {
      const task = await Task.findById(taskId)
      if(!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' })
      }
      if(task.project.toString() !== req.project._id.toString()) {
        return res.status(400).json({ error: 'Acción no valida' })
      }
      res.json(task)
    } catch (error) {
      console.log(error)
    }
  }

  static updateTask = async (req: Request, res: Response) => {
    const { taskId } = req.params
    try {
      const task = await Task.findByIdAndUpdate(taskId, req.body)
      if(!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' })
      }
      if(task.project.toString() !== req.project._id.toString()) {
        return res.status(400).json({ error: 'Acción no valida' })
      }
      await task.save()
      res.send("Tarea actualizada!")
    } catch (error) {
      console.log(error)
    }
  }

  static deleteTask = async (req: Request, res: Response) => {
    const { taskId } = req.params
    try {
      const task = await Task.findById(taskId)
      if(!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' })
      }
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)
      await Promise.allSettled([ task.deleteOne(), req.project.save() ])
      res.send("Tarea eliminada!")
    } catch (error) {
      console.log(error)
    }
  }
}