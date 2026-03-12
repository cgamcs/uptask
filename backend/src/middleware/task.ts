import type { Request, Response, NextFunction } from "express"
import Task, { ITask } from "../models/Task"

declare global { // permite reescribir el scope global para agregarlo al Request de express
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params
    const task = await Task.findById(taskId)
    if(!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }
    req.task = task // ahora funciona gracias a que se reescribio el Request de express
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error' })
  }
}

export function taskToBelongsToPorject(req: Request, res: Response, next: NextFunction) {
  if(req.task.project.toString() !== req.project._id.toString()) {
    return res.status(400).json({ error: 'Acción no valida' })
  }
  next()
}

export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
  if(req.user._id.toString() !== req.project.manager.toString()) {
    return res.status(400).json({ error: "Acción no valida" })
  }
  next()
}