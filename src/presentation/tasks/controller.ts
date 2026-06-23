import { Request, Response } from "express";

import { AllTasks, CreateTask, CreateTaskDto, CustomError, TaskRepository } from "../../domain";

export class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({error: error.message})
      return;
    }
    res.status(500).json({error: 'Internal Server Error'})
  }

  public createTask = async (req: Request, res: Response) => {
    const { id } = req.project;
    req.body.projectId = id;
    const [error, createTaskDto] = CreateTaskDto.create(req.body || {} )
    if (error) return res.status(400).json({error});
    new CreateTask(this.taskRepository)
      .execute(createTaskDto!)
      .then(task => res.status(201).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
    
  }
  public getProjectTasks = async (req: Request, res: Response) => {
    const { id } = req.project;
    new AllTasks(this.taskRepository)
      .execute(id)
      .then(task => res.status(200).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}