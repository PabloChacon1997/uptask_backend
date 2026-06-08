import { Request, Response } from "express";

import { CreateProject, CreateProjectDto, CustomError, ProjectRepository } from "../../domain";


export class ProjectController {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }

  public getAllProjects = async (req: Request, res: Response) => {
    res.send('Todos los proyectos')
  }

  public createProject = (req: Request, res: Response) => {
    const [error, createProjectDto] = CreateProjectDto.create(req.body || {} )
    if (error) return res.status(400).json({error});
    new CreateProject(this.projectRepository)
      .execute(createProjectDto!)
      .then(project => res.status(201).json(project))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}