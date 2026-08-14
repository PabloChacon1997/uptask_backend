import { Router } from "express";

import { ProjectDatasourceImpl } from "../../infraestructure/datasource/project.datasource.impl";
import { ProjectRepositoryImpl } from "../../infraestructure/repositories/project.repository.impl";
import { ProjectController } from "./controller";
import { TaskDatasourceImpl } from "../../infraestructure/datasource/task.datsource.impl";
import { TaskRepositoryImpl } from "../../infraestructure/repositories/task.repository.impl";
import { TaskController } from "../tasks/controller";
import { ValidateProjectMiddleware } from "../middlewares/project";
import { ValidateTasktMiddleware } from "../middlewares/task";
import { Auth } from "../middlewares/auth";
import { TeamMemberController } from "../team/controller";
import { TeamDatasourceImpl } from "../../infraestructure/datasource/team.datasource.impl";
import { TeamRepositoryImpl } from "../../infraestructure/repositories/team.repository.impl";
import { NoteController } from '../notes/controller';
import { NoteDatasourceImpl } from '../../infraestructure/datasource/note.datasource.impl';
import { NoteRepositoryImpl } from '../../infraestructure/repositories/note.repository.impl';


export class ProjectsRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new ProjectDatasourceImpl()
    const projectRepository = new ProjectRepositoryImpl(datasource);
    const projectController = new ProjectController(projectRepository);

    router.use(Auth.authenticate)

    router.get('/',
      projectController.getAllProjects);
    router.post('/',
      projectController.createProject);
    router.get('/:id',
      projectController.findProject);
    router.param('projectId', ValidateProjectMiddleware.validateProjectExists)
    router.put('/:projectId',
      ValidateTasktMiddleware.hasAuthorization,
      projectController.updateProject);
    router.delete('/:projectId',
      ValidateTasktMiddleware.hasAuthorization,
      projectController.deleteProject);

    // Tasks

    const taskDatasource = new TaskDatasourceImpl();
    const taskRepository = new TaskRepositoryImpl(taskDatasource)
    const taskController = new TaskController(taskRepository)

    
    
    router.post('/:projectId/tasks',
      ValidateTasktMiddleware.hasAuthorization,
      taskController.createTask)

    router.get('/:projectId/tasks',
      taskController.getProjectTasks)

    router.param('taskId', ValidateTasktMiddleware.validateTaskExists)
    router.param('taskId', ValidateTasktMiddleware.taskBelongsToProject)

    router.get('/:projectId/tasks/:taskId',
      taskController.getTaskById)
    router.put('/:projectId/tasks/:taskId',
      ValidateTasktMiddleware.hasAuthorization,
      taskController.updateTask)
    router.delete('/:projectId/tasks/:taskId',
      ValidateTasktMiddleware.hasAuthorization,
      taskController.deleteTask)
    router.post('/:projectId/tasks/:taskId/status',
      taskController.updateStatus)
    
    // Teams
    const teamDatasource = new TeamDatasourceImpl()
    const teamRepository = new TeamRepositoryImpl(teamDatasource)
    const teamController = new TeamMemberController(teamRepository)

    router.post('/:projectId/team/find',
      teamController.findMemberByEmail)

    router.get('/:projectId/team',
      teamController.getProjectTeam)

    router.post('/:projectId/team',
      teamController.addMemberById)

    router.delete('/:projectId/team/:userId',
      teamController.deleteMemberById)

    // Routes for Notes
    const noteDatasource = new NoteDatasourceImpl()
    const noteRepository = new NoteRepositoryImpl(noteDatasource)
    const noteController = new NoteController(noteRepository);
    router.post('/:projectId/tasks/:taskId/notes',
      noteController.createNote
    );

    router.get('/:projectId/tasks/:taskId/notes',
      noteController.getTaskNotes
    );

    router.delete('/:projectId/tasks/:taskId/notes/:noteId',
      noteController.deleteNote
    )


    return router;
  }
}