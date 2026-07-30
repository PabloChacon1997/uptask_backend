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

  async getTaskByIdAndUser(taskId: string): Promise<TaskEntity> {
    return await this.datsource.getTaskByIdAndUser(taskId);
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return await this.datsource.update(updateTaskDto);
  }

  async deleteById(id: string): Promise<TaskEntity> {
    return await this.datsource.deleteById(id);
  }

  async updateStatus(id: string, status: string, userId: string): Promise<string> {
    return await this.datsource.updateStatus(id, status, userId)
  }

}