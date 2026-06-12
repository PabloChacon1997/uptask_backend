import { CreateProjectDto, ProjectDatasource, ProjectEntity, ProjectRepository, UpdateProjectDto } from "../../domain";


export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    private readonly datsource: ProjectDatasource,
  ) {}  
  async getAll(): Promise<ProjectEntity[]> {
    return this.datsource.getAll();
  }
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.datsource.create(createProjectDto);
  }

  async findById(id: string): Promise<ProjectEntity> {
    return this.datsource.findById(id);
  }

  async updateById(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.datsource.updateById(updateProjectDto)
  }

  async deletedById(id: string): Promise<ProjectEntity> {
    return this.datsource.deleteById(id);
  }

}