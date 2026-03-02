import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if(!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' })
    }
    try {
      const task = new Task(req.body)
      task.project = project._id
      project.tasks.push(task._id)
      await task.save()
      await project.save()
      res.send("Tarea agregada!")
    } catch (error) {
      console.log(error)
    }
  }
}