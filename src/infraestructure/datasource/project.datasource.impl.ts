import { prisma } from "../../data/postgres";
import { CreateProjectDto, ProjectDatasource, ProjectEntity } from "../../domain";



export class ProjectDatasourceImpl implements ProjectDatasource {
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const project = await prisma.project.create({
      data: createProjectDto
    })

    return ProjectEntity.fromObject(project);
  }

}
