import { Request, Response } from "express";

import { AuthRepository, CustomError } from "../../domain";

export class AuthController {
  constructor(
    private readonly projectRepository: AuthRepository,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }
}