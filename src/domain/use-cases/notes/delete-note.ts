import { NoteRepository } from "../../repositories/note.repository"


export interface DeleteNoteUsecase {
  execute(noteId: string, userId: string): Promise<string>
}

export class DeleteNote implements DeleteNoteUsecase {
  constructor(
    private readonly repository: NoteRepository,
  ) {}
  async execute( noteId: string, userId: string): Promise<string> {
    return await this.repository.delete(noteId, userId)
  }
}