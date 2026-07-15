import { UserEntity } from "../../entities/user.entity"
import { AuthRepository } from "../../repositories/auth.repository"

export interface ConfirmAccountUsecase {
  execute(token: string): Promise<UserEntity>
}

export class ConfirmAccount implements ConfirmAccountUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( token: string): Promise<UserEntity> {
    return await this.repository.confirm(token)
  }
}