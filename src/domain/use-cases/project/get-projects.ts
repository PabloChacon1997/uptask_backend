import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";


export interface GetProjectsUsecase {
  execute(): Promise<ProjectEntity[]>
}

export class GetProjects implements GetProjectsUsecase {
  constructor(
    private readonly repository: ProjectRepository,
  ) {}
  execute(): Promise<ProjectEntity[]> {
    return this.repository.getAll();
  }
  

}
