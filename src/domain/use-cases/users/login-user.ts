import { ValidateLoginDto } from "../../dtos"
import { AuthRepository } from "../../repositories/auth.repository"

export interface LoginUserUsecase {
  execute(user: ValidateLoginDto): Promise<string>
}

export class LoginUser implements LoginUserUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( user: ValidateLoginDto): Promise<string> {
    return await this.repository.login(user)
  }
}