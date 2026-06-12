import { UpdateProjectDto } from "../../dtos";
import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";


export interface UpdateProjectUsecase {
  execute(dto: UpdateProjectDto): Promise<ProjectEntity>
}

export class UpdateProject implements UpdateProjectUsecase {
  constructor(
    private readonly repository: ProjectRepository
  ) {}
  execute(dto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.repository.updateById(dto)
  }

}