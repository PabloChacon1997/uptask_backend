import { CreateTaskDto, UpdateTaskDto } from "../dtos";
import { TaskEntity } from "../entities/task.entity";


export abstract class TaskDatasource {
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
  abstract getTasksByProjectId(projectId: string): Promise<TaskEntity[]>;
  abstract getTaskById(taskId: string): Promise<TaskEntity>;
  abstract getTaskByIdAndUser(taskId: string): Promise<TaskEntity>;
  abstract update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
  abstract deleteById(id: string): Promise<TaskEntity>;
  abstract updateStatus(id: string, status: string, userId: string): Promise<string>;
}