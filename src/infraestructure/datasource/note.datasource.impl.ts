import { prisma } from "../../data/postgres";
import { CustomError, NoteDatasource, NoteEntity } from "../../domain";


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

  async taskNotes(taskId: string): Promise<NoteEntity[]> {
    const notes = await prisma.note.findMany({ where: { taskId } });
    return notes
  }

  async delete(noteId: string, userId: string): Promise<string> {
    const note = await prisma.note.findUnique({
      where: {
        id: noteId
      }
    })
    if(!note) throw new CustomError(`Nota con el id ${noteId} no encontrada`, 404);
    if (note.created_by !== userId) throw new CustomError(`Acción Inválida`, 401);
    await prisma.note.delete({ where: { id: note.id } });
    return "Nota eliminada correctamente";
  }
}