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

  login(user: ValidateLoginDto): Promise<UserEntity> {
    return this.datsource.login(user);
  }
}