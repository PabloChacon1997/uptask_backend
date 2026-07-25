import { TeamRepository } from "../../repositories/team.repository";


export interface DeleteMemberByIdUsecase {
  execute(userId: string, projectId: string): Promise<string>;
}

export class DeleteMemberById implements DeleteMemberByIdUsecase {
  constructor(
    private readonly repository: TeamRepository,
  ) {}
  execute(userId: string, projectId: string): Promise<string> {
    return this.repository.deleteMemberById(userId, projectId);
  }
}