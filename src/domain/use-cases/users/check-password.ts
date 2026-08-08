import { AuthRepository } from "../../repositories/auth.repository";

export interface CheckPasswordUsecase {
  execute(userId: string, password: string): Promise<string>
}

export class CheckPassword implements CheckPasswordUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  
  execute(userId: string, password: string): Promise<string> {
    return this.repository.checkPassword(userId, password);
  }
  
}