import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'

declare global { // permite reescribir el scope global para agregarlo al Request de express [TaskController lo necesita]
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

export async function projectExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if(!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' })
    }
    req.project = project // ahora funciona gracias a que se reescribio el Request de express
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error' })
  }
}