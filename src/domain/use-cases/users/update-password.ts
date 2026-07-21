import { AuthRepository } from "../../repositories/auth.repository"

export interface UpdatePasswordUsecase {
  execute(token: string, password: string): Promise<string>
}

export class UpdatePassword implements UpdatePasswordUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  
  execute(token: string, password: string): Promise<string> {
    return this.repository.updatePassword(token, password);
  }
  
}