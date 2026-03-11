import { Request, Response } from "express"
import User from "../models/User"
import Project from "../models/Project"

export class TeamMemberController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
  
      const user = await User.findOne({ email }).select('id email name')
      if(!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }
  
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }

  static getProjectTeam = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.project._id).populate({
        path: 'team',
        select: 'id email name'
      })
  
      res.json(project.team)
    } catch (error) {
      console.log(error)
    }
  }

  static addMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
  
      const user = await User.findById(id).select('id')
      if(!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      if(req.project.team.some(teamMember => teamMember.toString() === user._id.toString())) {
        return res.status(409).json({ error: 'Este usuario ya es parte del equipo' })
      }
  
      req.project.team.push(user._id)
      await req.project.save()
  
      res.send('Miembro agregado!')
    } catch (error) {
      console.log(error)
    }
  }

  static removeMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      if(!req.project.team.some(teamMember => teamMember.toString() === id)) {
        return res.status(409).json({ error: 'Este usuario no existe en el equipo' })
      }

      req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== id)
      
      await req.project.save()
      res.send('Miembro eliminado!')
    } catch (error) {
      console.log(error)
    }
  }
}