import { Request, Response } from "express";

import { AddMemberById, CustomError, DeleteMemberById, FindUserByEmail, GetProjectTeam, TeamRepository, ValidateLoginDto } from "../../domain";

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
  public getProjectTeam = async (req: Request, res: Response) => {
      const projectId = req.project.id
      new GetProjectTeam(this.teamRepository)
        .execute(projectId)
        .then(team => res.json(team))
        .catch((err: CustomError) => this.handleError(res, err))
    }
  

  public addMemberById = async (req: Request, res: Response) => {
    const { id } = req.body
    const projectId = req.project.id
    if (!id || id.length === 0) return res.status(400).json({error: 'Id property user is required'});
    if (req.project.managerId === id) return res.status(409).json({error: 'Manager cant be a collaborator'});
    new AddMemberById(this.teamRepository)
      .execute(id, projectId)
      .then(member => res.json())
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public deleteMemberById = async (req: Request, res: Response) => {
    const { id } = req.body
    const projectId = req.project.id
    if (!id || id.length === 0) return res.status(400).json({error: 'Id property user is required'});
    if (req.project.managerId === id) return res.status(409).json({error: 'Manager cant be a remove'});
    new DeleteMemberById(this.teamRepository)
      .execute(id, projectId)
      .then(member => res.json(member))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}

