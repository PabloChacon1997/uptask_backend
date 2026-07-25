import { prisma } from "../../data/postgres";
import { CustomError, ProjectEntity, TeamDatsource, UserEntity } from "../../domain";


export class TeamDatasourceImpl implements TeamDatsource {
  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { email } })
    if(!user) throw new CustomError(`User with email ${email} not found`, 404)
    return user;
  }

  async getPorjectTeam(projectId: string): Promise<{ id: string; email: string; name: string; }[]> {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        team: {
          select: {
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    })

    const team:any[] = []
    project!.team.map(user => {
      team.push({
        id: user.user.id,
        name: user.user.name,
        email: user.user.email,
      })
    })


    return team
  }

  async addMemberById(id: string, projectId: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id } })
    if(!user) throw new CustomError(`User with id ${id} not found`, 404);
    const memberExists = await prisma.projectMember.findFirst({
      where: {
        userId: id,
        projectId,
      }
    })
    if (memberExists) {
      throw new CustomError(`User already exists in this project`, 409);
    }
    await prisma.projectMember.create({
      data: {
        userId: id,
        projectId,
      }
    });
    return 'Usuario agregado correctamente';
  }

  async deleteMemberById(id: string, projectId: string): Promise<string> {
    const memberExists = await prisma.projectMember.findFirst({
      where: {
        userId: id,
        projectId,
      }
    })
    if (!memberExists) {
      throw new CustomError(`User not exists in this project`, 409);
    }

    await prisma.projectMember.delete({
      where: {
        id: memberExists.id
      }
    })

    return 'Usuario eliminado correctamente';
  }

}