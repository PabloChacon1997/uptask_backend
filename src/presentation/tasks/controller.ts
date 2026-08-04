import { Request, Response } from "express";

import { AllTasks, CreateTask, CreateTaskDto, CustomError, DeleteTask, GetTask, TaskRepository, UpdateStatus, UpdateTask, UpdateTaskDto } from "../../domain";

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

  public createTask = (req: Request, res: Response) => {
    const { id } = req.project;
    req.body.projectId = id;
    const [error, createTaskDto] = CreateTaskDto.create(req.body || {} )
    if (error) return res.status(400).json({error});
    new CreateTask(this.taskRepository)
      .execute(createTaskDto!)
      .then(task => res.status(201).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
    
  }

  public getProjectTasks = (req: Request, res: Response) => {
    const { id } = req.project;
    new AllTasks(this.taskRepository)
      .execute(id)
      .then(task => res.status(200).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }
  
  public getTaskById = async (req: Request, res: Response) => {
    const { task } = req
    new GetTask(this.taskRepository)
      .getTaskAndUser(task.id)
      .then(task => res.status(200).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }
  
  public updateTask = async (req: Request, res: Response) => {
    const { task, project } = req
    req.body.projectId = project.id;
    const [ error, updateTaskDto ] = UpdateTaskDto.create({...req.body, id: task.id})
    if (error) return res.status(400).json({error});

    new UpdateTask(this.taskRepository)
      .execute(updateTaskDto!)
      .then(task => res.json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public deleteTask = async (req: Request, res: Response) => {
    const { task } = req
    new DeleteTask(this.taskRepository)
      .execute(task.id)
      .then(task => res.json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }

  public updateStatus = async (req: Request, res: Response) => {
    const { task } = req
    const { status } = req.body;
    const userId = req.user?.id
  
    new UpdateStatus(this.taskRepository)
      .execute(task.id, task.status,status, userId!)
      .then(task => res.json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}