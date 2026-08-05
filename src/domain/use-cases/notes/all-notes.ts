import { NoteEntity } from "../../entities/note.entity"
import { NoteRepository } from "../../repositories/note.repository"


export interface AllNoteskUsecase {
  execute(taskId: string): Promise<NoteEntity[]>
}

export class AllNotes implements AllNoteskUsecase {
  constructor(
    private readonly repository: NoteRepository,
  ) {}
  async execute( taskId: string): Promise<NoteEntity[]> {
    return await this.repository.taskNotes(taskId)
  }
}