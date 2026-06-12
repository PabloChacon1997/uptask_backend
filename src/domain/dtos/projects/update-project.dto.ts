

export class UpdateProjectDto {
  private constructor(
    public readonly id: string,
    public readonly projectName: string,
    public readonly clientName: string,
    public readonly description: string,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if(this.projectName) returnObj.projectName = this.projectName;
    if(this.clientName) returnObj.clientName = this.clientName;
    if(this.description) returnObj.description = this.description;
    return returnObj
  }

  static create(props: {[key: string]: any}): [string, undefined] | [undefined, UpdateProjectDto] {
    const { id, projectName, clientName, description } = props;
    if (!projectName || projectName.length === 0) return ['ProjectName property is required', undefined];
    if (!clientName || clientName.length === 0) return ['ClientName property is required', undefined];
    if (!description || description.length === 0) return ['Description property is required', undefined];
    return [undefined, new UpdateProjectDto(id, projectName, clientName, description)]
  }
}