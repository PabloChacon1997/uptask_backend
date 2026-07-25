import { ProjectEntity } from "../../entities/project.entity";
import { TeamRepository } from "../../repositories/team.repository";


export interface GetprojectTeamdUsecase {
  execute(projectId: string): Promise<{ id: string; email: string; name: string; }[]>
}

export class GetProjectTeam implements GetprojectTeamdUsecase {
  constructor(
    private readonly repository: TeamRepository,
  ) {}
  execute(projectId: string): Promise<{ id: string; email: string; name: string; }[]> {
    return this.repository.getPorjectTeam(projectId);
  }
}