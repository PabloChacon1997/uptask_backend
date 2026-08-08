import { CreateUserDto, ValidateLoginDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract confirm(token: string): Promise<UserEntity>;
  abstract login(user: ValidateLoginDto): Promise<string>;
  abstract confirmationCode(email: string): Promise<string>;
  abstract resetPassword(email: string): Promise<string>;
  abstract validateToken(token: string): Promise<string>;
  abstract updatePassword(token: string, password: string): Promise<string>;
  abstract updateProfile(id: string, name: string, email: string ): Promise<string>;
  abstract changePassword(id: string, current_password: string, password: string ): Promise<string>;
  abstract checkPassword(userId: string, password: string ): Promise<string>;
}