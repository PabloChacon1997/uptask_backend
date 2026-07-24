import { UserEntity } from "../entities/user.entity";


export abstract class TeamRepository {
  abstract findUserByEmail(email: string): Promise<UserEntity>;
}