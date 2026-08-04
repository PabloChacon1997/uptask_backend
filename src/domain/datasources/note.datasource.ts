

export abstract class NoteDatasource {
  abstract create(content: string, userId: string, taskId: string): Promise<string>;
}