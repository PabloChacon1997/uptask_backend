import { Router } from "express";

import { ProjectDatasourceImpl } from "../../infraestructure/datasource/project.datasource.impl";
import { ProjectRepositoryImpl } from "../../infraestructure/repositories/project.repository.impl";
import { ProjectController } from "./controller";
import { TaskDatasourceImpl } from "../../infraestructure/datasource/task.datsource.impl";
import { TaskRepositoryImpl } from "../../infraestructure/repositories/task.repository.impl";
import { TaskController } from "../tasks/controller";
import { ValidateProjectMiddleware } from "../middlewares/project";
import { ValidateTasktMiddleware } from "../middlewares/task";


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
    router.get('/:id',
      projectController.findProject);
    router.put('/:id',
      projectController.updateProject);
    router.delete('/:id',
      projectController.deleteProject);

    // Tasks

    const taskDatasource = new TaskDatasourceImpl();
    const taskRepository = new TaskRepositoryImpl(taskDatasource)
    const taskController = new TaskController(taskRepository)

    router.param('projectId', ValidateProjectMiddleware.validateProjectExists)
    
    router.post('/:projectId/tasks',
      taskController.createTask)

    router.get('/:projectId/tasks',
      taskController.getProjectTasks)

    router.param('taskId', ValidateTasktMiddleware.validateTaskExists)
    router.param('taskId', ValidateTasktMiddleware.taskBelongsToProject)

    router.get('/:projectId/tasks/:taskId',
      taskController.getTaskById)
    router.put('/:projectId/tasks/:taskId',
      taskController.updateTask)
    router.delete('/:projectId/tasks/:taskId',
      taskController.deleteTask)
    router.post('/:projectId/tasks/:taskId/status',
      taskController.updateStatus)

    return router;
  }
}