import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectEntity } from '../entities/project.entity';


export abstract class ProjectDatasource {
  abstract create(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
  abstract getAll(): Promise<ProjectEntity[]>;
  abstract findById(id: string): Promise<ProjectEntity>;
  abstract updateById(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;
  abstract deleteById(id: string): Promise<ProjectEntity>;
}