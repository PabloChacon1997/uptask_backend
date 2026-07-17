import { UserEntity } from "../../entities/user.entity"
import { AuthRepository } from "../../repositories/auth.repository"

export interface ConfirmTokenUsecase {
  execute(email: string): Promise<string>
}

export class ConfirmToken implements ConfirmTokenUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( email: string): Promise<string> {
    return await this.repository.confirmationCode(email)
  }
}