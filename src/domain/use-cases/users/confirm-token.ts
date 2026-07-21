import { AuthRepository } from "../../repositories/auth.repository"

export interface ConfirmTokenUsecase {
  execute(email: string): Promise<string>
  execute(token: string): Promise<string>
}

export class ConfirmToken implements ConfirmTokenUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( email: string): Promise<string> {
    return await this.repository.confirmationCode(email)
  }
  async vaidate( token: string): Promise<string> {
    return await this.repository.validateToken(token)
  }
}