import { UserEntity } from "../../entities/user.entity";
import { TeamRepository } from "../../repositories/team.repository";


export interface FindUserByEmailUsecase {
  execute(email: string): Promise<UserEntity>;
}

export class FindUserByEmail implements FindUserByEmailUsecase {
  constructor(
    private readonly repository: TeamRepository,
  ) {}
  execute(email: string): Promise<UserEntity> {
    return this.repository.findUserByEmail(email);
  }
}