import { TaskEntity } from "../../entities/task.entity"
import { TaskRepository } from "../../repositories/task.repository"

export interface GetTaskUsecase {
  execute(id: string): Promise<TaskEntity>
}

export class GetTask implements GetTaskUsecase {
  constructor(
    private readonly repository: TaskRepository,
  ) {}
  
  async execute( id: string): Promise<TaskEntity> {
    return await this.repository.getTaskById(id);
  }
}