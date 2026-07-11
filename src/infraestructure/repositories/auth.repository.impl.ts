import { AuthDatasource, AuthRepository, CreateUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly datsource: AuthDatasource,
  ) {} 
  
  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datsource.create(createUserDto);
  }
}