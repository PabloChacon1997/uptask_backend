import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { envs } from '../../config/envs';
import { prisma } from '../../data/postgres';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string, email: string, name: string }
    }
  }
}

export class Auth {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization
    if (!bearer) {
      const error = new Error('No Autorizado')
      return res.status(401).json({error: error.message});
    }
    const token = bearer.split(' ')[1];
    if (!token) {
      const error = new Error('No Autorizado')
      return res.status(401).json({error: error.message});
    }
    try {
      const decoded = jwt.verify(token, envs.JWT_SECRET)
      if (typeof decoded === 'object' && decoded.id) {
        const user = await prisma.user.findUnique({ 
          where: { id: decoded.id },
          select: { id: true, email: true, name: true }
        });
        if (!user) {
          return res.status(500).json({error: 'Token no válido'});
        }
        req.user = user;
        return next();
      }
      const error = new Error('No Autorizado')
      return res.status(401).json({error: error.message});
    } catch (error) {
      return res.status(500).json({error: 'Token no válido'});
    }
  }
}