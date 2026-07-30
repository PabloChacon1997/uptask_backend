

export class TaskEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public projectId: string,
    public status: string,
    public updated_by: string | null,
  ) {}

  public static fromObject(object: {[key: string]: any}): TaskEntity {
    const { id, name, description, projectId, status, updated_by } = object
    if(!id) throw 'Id is required';
    if(!name) throw 'Name is required';
    if(!description) throw 'Description is required';
    if(!projectId) throw 'ProjectId is required';
    if(!status) throw 'Status is required';

    return new TaskEntity(id, name, description, projectId, status, updated_by);
  }
}