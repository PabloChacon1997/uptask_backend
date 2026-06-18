import { Request, Response } from "express";

import { CreateTask, CustomError, GetProject, ProjectRepository, TaskRepository } from "../../domain";

export class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }

  async getProject(projectId: string) {
    try {
      const project = await new GetProject(this.projectRepository)
        .execute(projectId as string);

      return project
    } catch (err) {
      return null
    }
  }

  public createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await this.getProject(projectId as string)
    if (!project) {
      const error = new Error('Proyecto no encontrado')
      return res.status(404).json({error: error.message});
    }

    new CreateTask(this.taskRepository)
      .execute({
        ...req.body,
        projectId: project.id
      })
      .then(task => res.status(201).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
    
  }
}