import { AuthRepository } from "../../repositories/auth.repository";

export interface UpdateProfileUsecase {
  execute(id: string, name: string, email: string): Promise<string>
}

export class UpdateProfile implements UpdateProfileUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  
  execute(id: string, name: string, email: string): Promise<string> {
    return this.repository.updateProfile(id, name, email);
  }
  
}