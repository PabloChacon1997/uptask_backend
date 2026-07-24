import { TeamDatsource, TeamRepository, UserEntity } from "../../domain";


export class TeamRepositoryImpl implements TeamRepository {
  constructor(
    private readonly datsource: TeamDatsource,
  ) {}  
  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.datsource.findUserByEmail(email);
  }

}