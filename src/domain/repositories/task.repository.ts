import { CreateTaskDto } from "../dtos";
import { TaskEntity } from "../entities/task.entity";


export abstract class TaskRepository {
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
  abstract getTasksByProjectId(projectId: string): Promise<TaskEntity[]>;
}