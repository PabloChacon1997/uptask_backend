import type { Request, Response, NextFunction } from 'express'

import { prisma } from '../../data/postgres'
import { TaskEntity } from '../../domain';


declare global {
  namespace Express {
    interface Request {
      task: TaskEntity
    }
  }
}

export class ValidateTasktMiddleware {
  static async validateTaskExists(req: Request, res: Response, next: NextFunction) {
    const taskId  = req.params.taskId as string;
    try {
      const task = await prisma.task.findUnique({ where: { id: taskId } })
      if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({error: error.message});
      }
      req.task = task;
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un error'})
    }
  }
  static async taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { task } = req
      if (task.projectId !== req.project.id) {
        const error = new Error('Not valid action');
        return res.status(400).json({error: error.message})
      }
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un error'})
    }
  }
}