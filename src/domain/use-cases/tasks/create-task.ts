import { CreateTaskDto } from "../../dtos";
import { TaskEntity } from "../../entities/task.entity";
import { TaskRepository } from "../../repositories/task.repository";


export interface CreateTaskUsecase {
  execute(dto: CreateTaskDto): Promise<TaskEntity>
}

export class CreateTask implements CreateTaskUsecase {
  constructor(
    private readonly repository: TaskRepository,
  ) {}
  async execute( dto: CreateTaskDto): Promise<TaskEntity> {
    return await this.repository.create(dto)
  }
}