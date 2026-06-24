import { CreateTaskDto, TaskDatasource, TaskEntity, TaskRepository, UpdateTaskDto } from "../../domain";


export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    private readonly datsource: TaskDatasource,
  ) {}  
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.datsource.create(createTaskDto);
  }

  async getTasksByProjectId(projectId: string): Promise<TaskEntity[]> {
    return await this.datsource.getTasksByProjectId(projectId);
  }

  async getTaskById(taskId: string): Promise<TaskEntity> {
    return await this.datsource.getTaskById(taskId);
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return await this.datsource.update(updateTaskDto);
  }

}