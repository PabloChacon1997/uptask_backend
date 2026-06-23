import { TaskEntity } from "../../entities/task.entity";
import { TaskRepository } from "../../repositories/task.repository";


export interface AllTasksUsescase {
  execute(projectId: string): Promise<TaskEntity[]>
}

export class AllTasks implements AllTasksUsescase {
  constructor(
    private readonly repository: TaskRepository,
  ) {}

  async execute(projectId: string): Promise<TaskEntity[]> {
    return await this.repository.getTasksByProjectId(projectId);
  }

}