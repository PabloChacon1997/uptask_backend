import { CreateUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
}