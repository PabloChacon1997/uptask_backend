import { Request, Response } from "express";

import { AllTasks, CreateTask, CreateTaskDto, CustomError, GetTask, TaskRepository, UpdateTask, UpdateTaskDto } from "../../domain";

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

  async getTask(id: string) {
    try {
      const task = await new GetTask(this.taskRepository)
        .execute(id as string);
      return task;
    } catch (error) {
      return null;
    }
  }

  public getProjectTasks = (req: Request, res: Response) => {
    const { id } = req.project;
    new AllTasks(this.taskRepository)
      .execute(id)
      .then(task => res.status(200).json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }
  
  public getTaskById = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await this.getTask(taskId as string);
    if (!task) {
      const error =  new Error('Task not found with id: ' + taskId);
      return res.status(404).json({error: error.message})
    }
    if (task.projectId !== req.project.id) {
      const error = new Error('Not valid action');
      return res.status(400).json({error: error.message})
    }

    return res.status(200).json(task)
  }
  
  public updateTask = async (req: Request, res: Response) => {
    const id = req.params.taskId as string
    const projectId = req.params.projectId as string
    req.body.projectId = projectId;
    const [ error, updateTaskDto ] = UpdateTaskDto.create({...req.body, id})
    if (error) return res.status(400).json({error});
    if (updateTaskDto!.projectId !== req.project.id) {
      const error = new Error('Not valid action');
      return res.status(400).json({error: error.message})
    }

    new UpdateTask(this.taskRepository)
      .execute(updateTaskDto!)
      .then(task => res.json(task))
      .catch((err: CustomError) => this.handleError(res, err))
  }
}