


export abstract class NoteRepository {
  abstract create(content: string, userId: string, taskId: string): Promise<string>;
}