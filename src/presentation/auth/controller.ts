import { Request, Response } from "express";

import { AuthRepository, ConfirmAccount, ConfirmToken, CreateUser, CreateUserDto, CustomError, LoginUser, ValidateLoginDto } from "../../domain";

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }

  public createAccount = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body || {} )
    if (error) return res.status(400).json({error});
    new CreateUser(this.authRepository)
      .execute(createUserDto!)
      .then(user => res.status(201).json(user))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token || token.lenght === 0) return res.status(400).json({error: 'No existe un token'});
    new ConfirmAccount(this.authRepository)
      .execute(token)
      .then(user => res.status(200).json('Cuenta confirmada correctamente'))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public login = async (req: Request, res: Response) => {
    const [error, validateLoginDto] = ValidateLoginDto.create(req.body || {} )
    if (error) return res.status(400).json({error});
    new LoginUser(this.authRepository)
      .execute(validateLoginDto!)
      .then(user => res.status(200).json('Autenticado...'))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public confirmationCode = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || email.lenght === 0) return res.status(400).json({error: 'No existe un email'});
    if (!email.includes('@')) return res.status(400).json({error: 'Email no válido'});
    new ConfirmToken(this.authRepository)
      .execute(email)
      .then(user => res.status(200).json(user))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}