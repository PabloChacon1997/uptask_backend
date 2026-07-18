import { AuthRepository } from "../../repositories/auth.repository"

export interface ResetPasswordUsecase {
  execute(email: string): Promise<string>
}

export class ResetPassword implements ResetPasswordUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( email: string): Promise<string> {
    return await this.repository.resetPassword(email)
  }
}