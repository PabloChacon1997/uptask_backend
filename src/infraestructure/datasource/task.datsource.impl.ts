import { prisma } from "../../data/postgres";
import { CreateTaskDto, TaskDatasource, TaskEntity } from "../../domain";


export class TaskDatasourceImpl implements TaskDatasource {
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = await prisma.task.create({
      data: createTaskDto
    })

    return TaskEntity.fromObject(task);
  }

  async getTasksByProjectId(projectId: string): Promise<TaskEntity[]> {
    const tasks = await prisma.task.findMany({
      where: {
        projectId
      }
    });

    return tasks.map(task => TaskEntity.fromObject(task));
  }

}