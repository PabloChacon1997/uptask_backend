import { TaskEntity } from "../../entities/task.entity";
import { TaskRepository } from "../../repositories/task.repository";



export interface DeleteTaskUsesase {
  execute(id: string): Promise<TaskEntity>
}

export class DeleteTask implements DeleteTaskUsesase {
  constructor(
    private readonly repository: TaskRepository
  ) {}
  execute(id: string): Promise<TaskEntity> {
    return this.repository.deleteById(id);
  }

}