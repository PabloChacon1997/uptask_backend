import { ProjectEntity, TeamDatsource, TeamRepository, UserEntity } from "../../domain";


export class TeamRepositoryImpl implements TeamRepository {
  constructor(
    private readonly datsource: TeamDatsource,
  ) {}  
  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.datsource.findUserByEmail(email);
  }

  async getPorjectTeam(projectId: string): Promise<{ id: string; email: string; name: string;}[]> {
    return this.datsource.getPorjectTeam(projectId);
  }

  async addMemberById(id: string, projectId: string): Promise<string> {
    return this.datsource.addMemberById(id, projectId);
  }

  async deleteMemberById(id: string, projectId: string): Promise<string> {
    return this.datsource.deleteMemberById(id, projectId);
  }

}