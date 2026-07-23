import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectEntity } from '../entities/project.entity';


export abstract class ProjectRepository {
  abstract create(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
  abstract getAll(managerId: string): Promise<ProjectEntity[]>
  abstract findById(id: string, managerId: string): Promise<ProjectEntity>
  abstract updateById(updateProjectDto: UpdateProjectDto, managerId: string): Promise<ProjectEntity>
  abstract deletedById(id: string, managerId: string): Promise<ProjectEntity>
}