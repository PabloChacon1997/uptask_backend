import { CreateUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
}