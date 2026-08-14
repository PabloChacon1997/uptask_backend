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

  async getTaskByIdAndUser(taskId: string): Promise<TaskEntity> {
    const task = await prisma.task.findUnique({ 
      where: { id: taskId},
      include: {
        user: { select: { id: true, name: true, email: true } },
        notes: {
          include: {
            creator: { select: { id: true, name: true, email: true }  }
          }
        }
      }
    });
    if(!task) throw new CustomError(`Task with id ${taskId} not found`, 404)
    return task;
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
    const deletTask = await prisma.$transaction(async  tx => {
      await tx.note.deleteMany({ where: { taskId: id } });
      await tx.taskHistory.deleteMany({ where: { taskId: id } });
      return await tx.task.delete({ where: { id } })
    })
    return TaskEntity.fromObject(deletTask);
  }

  async updateStatus(id: string,prevStatus: string,status: string, userId: string): Promise<string> {
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) throw new CustomError(`Invalid Status`, 400);
    await prisma.$transaction(async (tx) => {
      await tx.taskHistory.create({
        data: {
          taskId: id,
          userId,
          prevStatus: prevStatus as TaskStatus,
          newStatus: status as TaskStatus,
        }
      })
      await tx.task.update({
        where: {
          id
        },
        data: {
          status: status as TaskStatus,
          updated_by: userId,
        }
      })
    })

    return 'Tarea actualizada';
  }

}