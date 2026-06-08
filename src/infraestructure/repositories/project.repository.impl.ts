import { CreateProjectDto, ProjectDatasource, ProjectEntity, ProjectRepository } from "../../domain";


export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    private readonly datsource: ProjectDatasource,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.datsource.create(createProjectDto);
  }

}