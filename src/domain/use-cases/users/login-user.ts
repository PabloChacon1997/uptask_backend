import { ValidateLoginDto } from "../../dtos"
import { UserEntity } from "../../entities/user.entity"
import { AuthRepository } from "../../repositories/auth.repository"

export interface LoginUserUsecase {
  execute(user: ValidateLoginDto): Promise<UserEntity>
}

export class LoginUser implements LoginUserUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( user: ValidateLoginDto): Promise<UserEntity> {
    return await this.repository.login(user)
  }
}