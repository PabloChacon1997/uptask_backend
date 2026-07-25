import { ProjectEntity } from "../entities/project.entity";
import { UserEntity } from "../entities/user.entity";


export abstract class TeamDatsource {
  abstract findUserByEmail(email: string): Promise<UserEntity>;
  abstract getPorjectTeam( projectId: string): Promise<{ id: string; email: string; name: string; }[]>;
  abstract addMemberById(id: string, projectId: string): Promise<string>;
  abstract deleteMemberById(id: string, projectId: string): Promise<string>;
}