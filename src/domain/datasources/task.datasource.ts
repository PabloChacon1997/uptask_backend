import { CreateTaskDto } from "../dtos/tasks/create-task.dto";
import { TaskEntity } from "../entities/task.entity";


export abstract class TaskDatasource {
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
}