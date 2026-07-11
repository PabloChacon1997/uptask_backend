import { Request, Response } from "express";

import { AuthRepository, CreateUser, CreateUserDto, CustomError } from "../../domain";
import { hashPassword } from "../../utils/auth";

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
    if (createUserDto) {
      createUserDto.password = await hashPassword(req.body.password);
    }
    new CreateUser(this.authRepository)
      .execute(createUserDto!)
      .then(user => res.status(201).json(user))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}