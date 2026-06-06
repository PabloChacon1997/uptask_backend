import { CreateProjectDto } from "../../dtos/projects/create-project.dto";
import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";



export interface CreateProjectUseCase {
  execute(dto: CreateProjectDto): Promise<ProjectEntity>;
}

export class CreateProject implements CreateProjectUseCase {
  constructor(
    private readonly repository: ProjectRepository,
  ) {}
  execute(dto: CreateProjectDto): Promise<ProjectEntity> {
    return this.repository.create(dto);
  }
}