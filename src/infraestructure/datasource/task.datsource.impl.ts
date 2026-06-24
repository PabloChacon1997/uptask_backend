import { TaskStatus } from "../../../generated/prisma";
import { prisma } from "../../data/postgres";
import { CreateTaskDto, CustomError, TaskDatasource, TaskEntity, UpdateTaskDto } from "../../domain";


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
      },
      include: {
        project: true,
      }
    });

    return tasks.map(task => TaskEntity.fromObject(task));
    // return tasks;
  }

  async getTaskById(taskId: string): Promise<TaskEntity> {
    const task = await prisma.task.findUnique({ where: { id: taskId} });
    if(!task) throw new CustomError(`Task with id ${taskId} not found`, 404)
    return TaskEntity.fromObject(task);
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.getTaskById(updateTaskDto.id);
    const updateTask = await prisma.task.update({
      where: { id: updateTaskDto.id },
      data: updateTaskDto.values
    })

    return TaskEntity.fromObject(updateTask);
  }

  async deleteById(id: string): Promise<TaskEntity> {
    const deletTask = await prisma.task.delete({ where: { id } })
    return TaskEntity.fromObject(deletTask);
  }

  async updateStatus(id: string,status: string): Promise<string> {
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) throw new CustomError(`Invalid Status`, 400)
    await prisma.task.update({
      where: {
        id
      },
      data: {
        status: status as TaskStatus
      }
    })

    return 'Tarea actualizada';
  }

}