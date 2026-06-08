import { Router } from "express";

import { ProjectDatasourceImpl } from "../../infraestructure/datasource/project.datasource.impl";
import { ProjectRepositoryImpl } from "../../infraestructure/repositories/project.repository.impl";
import { ProjectController } from "./controller";


export class ProjectsRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new ProjectDatasourceImpl()
    const projectRepository = new ProjectRepositoryImpl(datasource);
    const projectController = new ProjectController(projectRepository);

    router.get('/',
      projectController.getAllProjects);
    router.post('/',
      projectController.createProject);

    return router;
  }
}