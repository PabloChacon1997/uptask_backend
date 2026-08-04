import { prisma } from "../../data/postgres";
import { NoteDatasource } from "../../domain";


export class NoteDatasourceImpl implements NoteDatasource {
  async create(content: string, userId: string, taskId: string): Promise<string> {
    await prisma.note.create({
      data: {
        content,
        created_by: userId,
        taskId
      }
    });

    return "Nota creada correctamente";
  }
}