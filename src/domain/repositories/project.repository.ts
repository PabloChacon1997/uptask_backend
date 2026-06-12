import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectEntity } from '../entities/project.entity';


export abstract class ProjectRepository {
  abstract create(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
  abstract getAll(): Promise<ProjectEntity[]>
  abstract findById(id: string): Promise<ProjectEntity>
  abstract updateById(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>
  abstract deletedById(id: string): Promise<ProjectEntity>
}