import { ProjectEntity } from "../../entities/project.entity";
import { ProjectRepository } from "../../repositories/project.repository";


export interface DeleteProjecUsesase {
  execute(id: string): Promise<ProjectEntity>
}

export class DeleteProject implements DeleteProjecUsesase {
  constructor(
    private readonly repository: ProjectRepository
  ) {}
  execute(id: string): Promise<ProjectEntity> {
    return this.repository.deletedById(id);
  }

}