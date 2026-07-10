import { AuthDatasource, AuthRepository } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly datsource: AuthDatasource,
  ) {}  
}