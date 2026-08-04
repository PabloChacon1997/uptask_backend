import { NoteDatasource, NoteRepository } from "../../domain";


export class NoteRepositoryImpl implements NoteRepository {
  constructor(
    private readonly datsource: NoteDatasource,
  ) {}

  async create(content: string, userId: string, taskId: string): Promise<string> {
    return await this.datsource.create(content, userId, taskId);
  }
}