import { Request, Response } from "express";

import { AllNotes, CreateNote, CustomError, DeleteNote, NoteRepository } from "../../domain";

export class NoteController {

  constructor(
    private readonly noteRepository: NoteRepository,
  ) {}
  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }
  public createNote = async (req: Request, res: Response) => {
    const { content } = req.body;
    const userId = req.user?.id
    const taskId = req.task.id

    if (!content || content.length === 0) return res.status(400).json({error: 'El contenido de la nota es obligatorio'});
    new CreateNote(this.noteRepository)
      .execute(content, userId!, taskId)
      .then(note => res.status(201).json(note))
      .catch((err: CustomError) => this.handleError(res, err))
  }
  
  public getTaskNotes = async (req: Request, res: Response) => {
    const taskId = req.task.id
    new AllNotes(this.noteRepository)
      .execute(taskId)
      .then(notes => res.json(notes))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public deleteNote = async (req: Request, res: Response) => {
    const {noteId} = req.params
    const userId = req.user?.id
    if (!noteId || noteId.length === 0) return res.status(400).json({error: 'El Id de la nota es obligatorio'});
    new DeleteNote(this.noteRepository)
      .execute(noteId as string, userId!)
      .then(notes => res.json(notes))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}