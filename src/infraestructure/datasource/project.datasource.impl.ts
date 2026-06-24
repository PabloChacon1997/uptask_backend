import { prisma } from "../../data/postgres";
import { CreateProjectDto, CustomError, ProjectDatasource, ProjectEntity, UpdateProjectDto } from "../../domain";



export class ProjectDatasourceImpl implements ProjectDatasource {

  async getAll(): Promise<ProjectEntity[]> {
    const projects = await prisma.project.findMany({})
    return projects.map(project => ProjectEntity.fromObject(project));
  }
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = await prisma.project.create({
      data: createProjectDto
    })

    return ProjectEntity.fromObject(project);
  }

  async findById(id: string): Promise<ProjectEntity> {
    const project = await prisma.project.findUnique({ 
      where: { id },
      include: {
        tasks: true
      }
    })
    if(!project) throw new CustomError(`Project with id ${id} not found`, 404)
    // return ProjectEntity.fromObject(project);
    return project;
  }

  async updateById(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    await this.findById(updateProjectDto.id)
    const updateProject = await prisma.project.update({
      where: { id: updateProjectDto.id },
      data: updateProjectDto.values
    })

    return ProjectEntity.fromObject(updateProject);
  }

  async deleteById(id: string): Promise<ProjectEntity> {
    await this.findById(id);
    const deleted = await prisma.project.delete({ where: { id } })
    return ProjectEntity.fromObject(deleted);
  }

}
