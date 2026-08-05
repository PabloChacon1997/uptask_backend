


export class NoteEntity {
  constructor(
    public id: string,
    public content: string
  ) {}

  public static fromObject(object: {[key: string]: any}): NoteEntity {
    const { id, content } = object
    if(!id) throw 'Id is required';
    if(!content) throw 'Name is required';
    return new NoteEntity(id, content);
  }
}