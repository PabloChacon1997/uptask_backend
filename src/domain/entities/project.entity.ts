

export class ProjectEntity {
  constructor(
    public id: string,
    public projectName: string,
    public clientName: string,
    public description: string,
  ) {}

  public static fromObject(object: {[key: string]: any}): ProjectEntity {
    const { id, projectName, clientName, description } = object
    if(!id) throw 'Id is required';
    if(!projectName) throw 'ProjectName is required';
    if(!clientName) throw 'ClientName is required';
    if(!description) throw 'Description is required';

    return new ProjectEntity(id, projectName, clientName, description);
  }
}