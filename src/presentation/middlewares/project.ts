import type { Request, Response, NextFunction } from 'express'

import { prisma } from '../../data/postgres'
import { ProjectEntity } from '../../domain';


declare global {
  namespace Express {
    interface Request {
      project: ProjectEntity
    }
  }
}

export class ValidateProjectMiddleware {
  static async validateProjectExists(req: Request, res: Response, next: NextFunction) {
    const projectId  = req.params.projectId as string;
    try {
      const project = await prisma.project.findUnique({ where: { id: projectId } })
      if (!project) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({error: error.message});
      }
      req.project = project;
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un error'})
    }
  }
}