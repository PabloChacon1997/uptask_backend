import { Request, Response } from "express";

import { CustomError, FindUserByEmail, TeamRepository, ValidateLoginDto } from "../../domain";

export class TeamMemberController {
  constructor(
    private readonly teamRepository: TeamRepository,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }

  public findMemberByEmail = async (req: Request, res: Response) => {
    const [error, email] = ValidateLoginDto.validateEmail(req.body || {} )
    if (error) return res.status(400).json({error});
    new FindUserByEmail(this.teamRepository)
      .execute(email!.toLowerCase())
      .then(user => res.json({id: user.id, email: user.email, name: user.name}))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}