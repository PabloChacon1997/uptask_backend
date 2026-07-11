import { CreateUserDto } from "../../dtos"
import { UserEntity } from "../../entities/user.entity"
import { AuthRepository } from "../../repositories/auth.repository"

export interface CreateUserUsecase {
  execute(dto: CreateUserDto): Promise<UserEntity>
}

export class CreateUser implements CreateUserUsecase {
  constructor(
    private readonly repository: AuthRepository,
  ) {}
  async execute( dto: CreateUserDto): Promise<UserEntity> {
    return await this.repository.create(dto)
  }
}