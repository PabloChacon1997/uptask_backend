import { NoteDatasource, NoteEntity, NoteRepository } from "../../domain";


export class NoteRepositoryImpl implements NoteRepository {
  constructor(
    private readonly datsource: NoteDatasource,
  ) {}

  async create(content: string, userId: string, taskId: string): Promise<string> {
    return await this.datsource.create(content, userId, taskId);
  }

  async taskNotes(taskId: string): Promise<NoteEntity[]> {
    return await this.datsource.taskNotes(taskId);
  }

  async delete(noteId: string, userId: string): Promise<string> {
    return await this.datsource.delete(noteId, userId);
  }
}