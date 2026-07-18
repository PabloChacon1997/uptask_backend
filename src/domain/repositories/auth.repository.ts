import { CreateUserDto, ValidateLoginDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract confirm(token: string): Promise<UserEntity>;
  abstract login(user: ValidateLoginDto): Promise<UserEntity>;
  abstract confirmationCode(email: string): Promise<string>;
  abstract resetPassword(email: string): Promise<string>;
}