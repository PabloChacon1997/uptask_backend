import { AuthDatasource, AuthRepository, CreateUserDto, UserEntity, ValidateLoginDto } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly datsource: AuthDatasource,
  ) {} 
  
  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datsource.create(createUserDto);
  }

  confirm(token: string): Promise<UserEntity> {
    return this.datsource.confirm(token);
  }

  login(user: ValidateLoginDto): Promise<string> {
    return this.datsource.login(user);
  }

  confirmationCode(email: string): Promise<string> {
    return this.datsource.confirmationCode(email);
  }

  resetPassword(email: string): Promise<string> {
    return this.datsource.resetPassword(email);
  }

  validateToken(token: string): Promise<string> {
    return this.datsource.validateToken(token);
  }

  updatePassword(token: string, password: string): Promise<string> {
    return this.datsource.updatePassword(token, password);
  }
}