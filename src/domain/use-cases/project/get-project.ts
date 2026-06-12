import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";


export interface GetProjectUsecase {
  execute(id: string): Promise<ProjectEntity>
}

export class GetProject implements GetProjectUsecase {
  constructor(
    private readonly repository: ProjectRepository,
  ) {}
  execute(id: string): Promise<ProjectEntity> {
    return this.repository.findById(id);
  }

}