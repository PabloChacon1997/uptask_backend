import { Router } from "express";
import { ProjectsRoutes } from "./projects/routes";
import { AuthRoutes } from "./auth/routes";



export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/projects', ProjectsRoutes.routes);
    
    return router;
  }
}