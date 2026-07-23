import { prisma } from "../../data/postgres";
import { CreateProjectDto, CustomError, ProjectDatasource, ProjectEntity, UpdateProjectDto } from "../../domain";



export class ProjectDatasourceImpl implements ProjectDatasource {

  async getAll(managerId: string): Promise<ProjectEntity[]> {
    const projects = await prisma.project.findMany({
      where: { managerId }
    })
    return projects.map(project => ProjectEntity.fromObject(project));
  }
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = await prisma.project.create({
      data: createProjectDto
    })

    return ProjectEntity.fromObject(project);
  }

  async findById(id: string, managerId: string): Promise<ProjectEntity> {
    const project = await prisma.project.findUnique({ 
      where: { id },
      include: {
        tasks: true
      }
    })
    if(!project) throw new CustomError(`Project with id ${id} not found`, 404)
    if(project.managerId !== managerId ) throw new CustomError(`Invalid action`, 401)
    // return ProjectEntity.fromObject(project);
    return project;
  }

  async updateById(updateProjectDto: UpdateProjectDto, managerId: string): Promise<ProjectEntity> {
    await this.findById(updateProjectDto.id, managerId);
    const updateProject = await prisma.project.update({
      where: { id: updateProjectDto.id },
      data: updateProjectDto.values
    })

    return ProjectEntity.fromObject(updateProject);
  }

  async deleteById(id: string, managerId: string): Promise<ProjectEntity> {
    await this.findById(id, managerId);
    const deleted = await prisma.project.delete({ where: { id } })
    return ProjectEntity.fromObject(deleted);
  }

}
