import { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)

    try {
      await project.save()
      res.send("Proyecto guardado!")
    } catch (error) {
      console.log(error)
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({})
      res.json(projects)
    } catch (error) {
      console.log(error)
    }
  }

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id).populate('tasks')
      if(!project) {
        return res.status(404).json({ error: 'Proyecto no encontrado' })
      }
      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id)
      if(!project) {
        return res.status(404).json({ error: 'Proyecto no encontrado' })
      }
      project.projectName = req.body.projectName
      project.clientName = req.body.clientName
      project.description = req.body.description
      await project.save()
      res.send("Proyecto actualizado!")
    } catch (error) {
      console.log(error)
    }
  }

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id)
      if(!project) {
        return res.status(404).json({ error: 'Proyecto no encontrado' })
      }
      await project.deleteOne()
      res.send("Proyecto eliminado!")
    } catch (error) {
      console.log(error)
    }
  }
}