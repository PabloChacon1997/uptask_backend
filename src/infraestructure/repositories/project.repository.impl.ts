import { CreateProjectDto, ProjectDatasource, ProjectEntity, ProjectRepository, UpdateProjectDto } from "../../domain";


export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    private readonly datsource: ProjectDatasource,
  ) {}  
  async getAll(managerId: string): Promise<ProjectEntity[]> {
    return this.datsource.getAll(managerId);
  }
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.datsource.create(createProjectDto);
  }

  async findById(id: string, managerId: string): Promise<ProjectEntity> {
    return this.datsource.findById(id, managerId);
  }

  async updateById(updateProjectDto: UpdateProjectDto, managerId: string): Promise<ProjectEntity> {
    return this.datsource.updateById(updateProjectDto, managerId)
  }

  async deletedById(id: string, managerId: string): Promise<ProjectEntity> {
    return this.datsource.deleteById(id, managerId);
  }

}