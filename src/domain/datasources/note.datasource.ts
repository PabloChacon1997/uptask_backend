import { NoteEntity } from "../entities/note.entity";


export abstract class NoteDatasource {
  abstract create(content: string, userId: string, taskId: string): Promise<string>;
  abstract taskNotes(taskId: string): Promise<NoteEntity[]>;
  abstract delete(noteId: string, userId: string): Promise<string>;
}