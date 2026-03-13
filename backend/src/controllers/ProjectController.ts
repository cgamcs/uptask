import { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)

    // Asignar un manager
    project.manager = req.user._id

    try {
      await project.save()
      res.send("Proyecto guardado!")
    } catch (error) {
      console.log(error)
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          {manager: {$in: req.user._id}}, // Solo obtine los porjectos que le pertenecen al usuario autenticado
          {team: {$in: [req.user._id]}}
        ]
      })
      res.json(projects)
    } catch (error) {
      console.log(error)
    }
  }

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id).populate({
        path: 'tasks',
        populate: [
          {
            path: 'completedBy.user',
            select: 'id name email'
          },
          {
            path: 'notes',
            populate: {
              path: 'createdBy',
              select: 'id name email'
            }
          }
        ]
      })
      
      if(!project) {
        return res.status(404).json({ error: 'Proyecto no encontrado' })
      }

      if(project.manager.toString() !== req.user._id.toString() && !project.team.includes(req.user._id)) {
        return res.status(404).json({ error: 'Accion no valida' })
      }

      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }

  static updateProject = async (req: Request, res: Response) => {
    try {
      req.project.projectName = req.body.projectName
      req.project.clientName = req.body.clientName
      req.project.description = req.body.description

      await req.project.save()
      res.send("Proyecto actualizado!")
    } catch (error) {
      console.log(error)
    }
  }

  static deleteProject = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne()
      res.send("Proyecto eliminado!")
    } catch (error) {
      console.log(error)
    }
  }
}