

export class CreateProjectDto {
  private constructor(
    public readonly projectName: string,
    public readonly clientName: string,
    public readonly description: string,
  ) {}

  static create(props: {[key: string]: any}): [string, undefined] | [undefined, CreateProjectDto] {
    const { projectName, clientName, description } = props;
    if (!projectName || projectName.length === 0) return ['ProjectName property is required', undefined];
    if (!clientName || clientName.length === 0) return ['ClientName property is required', undefined];
    if (!description || description.length === 0) return ['Description property is required', undefined];
    return [undefined, new CreateProjectDto(projectName, clientName, description)]
  }
}