import { TaskStatus } from "../../enums/TaskStatus";


export class CreateTaskDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly projectId: string,
  ) {}

  static create(props: {[key: string]: any}): [string, undefined] | [undefined, CreateTaskDto] {
    const { name, description, projectId} = props;
    if (!name || name.length === 0) return ['Name property is required', undefined];
    if (!description || description.length === 0) return ['Description property is required', undefined];
    if (!projectId) return ['Missing Project', undefined];
    return [undefined, new CreateTaskDto(name, description, projectId)]
  }
}