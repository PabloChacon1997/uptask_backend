import { TaskStatus } from "../../enums/TaskStatus";

export class UpdateTaskDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly projectId: string,
    public readonly status: string,
    public readonly updated_by: string | null,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if(this.name) returnObj.name = this.name;
    if(this.status) returnObj.status = this.status;
    if(this.description) returnObj.description = this.description;
    return returnObj
  }

  static create(props: {[key: string]: any}): [string, undefined] | [undefined, UpdateTaskDto] {
    const {id, name, description, projectId, status, updated_by} = props;
    if (!name || name.length === 0) return ['Name property is required', undefined];
    if (!description || description.length === 0) return ['Description property is required', undefined];
    if (!status || status.length === 0) return ['Status property is required', undefined];
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) return ['Status is not valid property', undefined];
    if (!projectId) return ['Missing Project', undefined];
    return [undefined, new UpdateTaskDto(id, name, description, projectId, status, updated_by || null)]
  }
}