import { Request, Response } from "express";

import { CreateProject, CreateProjectDto, CustomError, DeleteProject, GetProject, GetProjects, ProjectRepository, UpdateProject, UpdateProjectDto } from "../../domain";


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
    const id = req.user?.id
    new GetProjects(this.projectRepository)
      .execute(id!)
      .then(project => res.json(project))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public createProject = (req: Request, res: Response) => {
    req.body.managerId = req.user?.id
    const [error, createProjectDto] = CreateProjectDto.create(req.body || {} )
    if (error) return res.status(400).json({error});
    new CreateProject(this.projectRepository)
      .execute(createProjectDto!)
      .then(project => res.status(201).json('Proyecto creado correctamente'))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public findProject = (req: Request, res: Response) => {
    const id = req.params.id as string
    const managerId = req.user?.id
    new GetProject(this.projectRepository)
      .execute(id, managerId!)
      .then(project => res.json(project))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public updateProject = (req: Request, res: Response) => {
    const id = req.params.id as string
    const managerId = req.user?.id
    const [ error, updateProjectDto ] = UpdateProjectDto.create({...req.body, id})
    if (error) return res.status(400).json({error});

    new UpdateProject(this.projectRepository)
      .execute(updateProjectDto!, managerId!)
      .then(project => res.json(project))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public deleteProject = (req: Request, res: Response) => {
    const id = req.params.id as string
    const managerId = req.user?.id
    new DeleteProject(this.projectRepository)
      .execute(id, managerId!)
      .then(project => res.json(project))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}