import { AuthRepository } from "../../repositories/auth.repository";

export interface ChangePasswordUsecase {
  execute(id: string, current_password: string, password: string): Promise<string>
}

export class ChangePassword implements ChangePasswordUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  
  execute(id: string, current_password: string, password: string): Promise<string> {
    return this.repository.changePassword(id, current_password, password);
  }
  
}