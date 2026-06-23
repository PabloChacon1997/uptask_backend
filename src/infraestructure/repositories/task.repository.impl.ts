import { CreateTaskDto, TaskDatasource, TaskEntity, TaskRepository } from "../../domain";


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

}