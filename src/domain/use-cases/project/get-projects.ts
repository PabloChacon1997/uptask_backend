import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";


export interface GetProjectsUsecase {
  execute(managerId: string, userId: string): Promise<ProjectEntity[]>
}

export class GetProjects implements GetProjectsUsecase {
  constructor(
    private readonly repository: ProjectRepository,
  ) {}
  execute(managerId: string, userId: string): Promise<ProjectEntity[]> {
    return this.repository.getAll(managerId, userId);
  }
  

}
