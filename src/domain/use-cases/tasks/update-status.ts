import { TaskRepository } from "../../repositories/task.repository"

export interface UpdateStatusUsecase {
  execute(id: string, status: string, userId: string): Promise<string>
}

export class UpdateStatus implements UpdateStatusUsecase {
  constructor(
    private readonly repository: TaskRepository
  ) {}
  execute(id: string, status: string, userId: string): Promise<string> {
    return this.repository.updateStatus(id, status, userId)
  }

}