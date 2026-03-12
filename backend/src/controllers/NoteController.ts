import { Request, Response } from "express"
import Note, { INote } from "../models/Notes"

export class NoteController {
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    const { content } = req.body

    const note = new Note()
    note.content = content
    note.createdBy = req.user._id
    note.task = req.task._id

    req.task.notes.push(note._id)

    try {
      await Promise.allSettled([ req.task.save(), note.save() ])
      res.send('Nota creada!')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}