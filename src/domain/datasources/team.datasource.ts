import { UserEntity } from "../entities/user.entity";


export abstract class TeamDatsource {
  abstract findUserByEmail(email: string): Promise<UserEntity>;
}