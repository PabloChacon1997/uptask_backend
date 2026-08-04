import { NoteRepository } from "../../repositories/note.repository"



export interface CreateNotekUsecase {
  execute(content: string, userId: string, taskId: string): Promise<string>
}

export class CreateNote implements CreateNotekUsecase {
  constructor(
    private readonly repository: NoteRepository,
  ) {}
  async execute( content: string, userId: string, taskId: string): Promise<string> {
    return await this.repository.create(content, userId, taskId)
  }
}