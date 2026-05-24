import { Router } from "express";



export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    
    return router;
  }
}