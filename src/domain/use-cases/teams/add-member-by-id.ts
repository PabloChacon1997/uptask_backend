import { TeamRepository } from "../../repositories/team.repository";


export interface AddMemberiByIdUsecase {
  execute(userId: string, projectId: string): Promise<string>;
}

export class AddMemberById implements AddMemberiByIdUsecase {
  constructor(
    private readonly repository: TeamRepository,
  ) {}
  execute(userId: string, projectId: string): Promise<string> {
    return this.repository.addMemberById(userId, projectId);
  }
}