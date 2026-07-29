import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectEntity } from '../entities/project.entity';


export abstract class ProjectDatasource {
  abstract create(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
  abstract getAll( managerId: string, userId: string ): Promise<ProjectEntity[]>;
  abstract findById(id: string, managerId: string): Promise<ProjectEntity>;
  abstract updateById(updateProjectDto: UpdateProjectDto, managerId: string): Promise<ProjectEntity>;
  abstract deleteById(id: string, managerId: string): Promise<ProjectEntity>;
}