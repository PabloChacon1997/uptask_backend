import { prisma } from "../../data/postgres";
import { CustomError, TeamDatsource, UserEntity } from "../../domain";


export class TeamDatasourceImpl implements TeamDatsource {
  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { email } })
    if(!user) throw new CustomError(`User with email ${email} not found`, 404)
    return user;
  }

}