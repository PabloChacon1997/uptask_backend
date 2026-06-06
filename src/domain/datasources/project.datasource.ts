import { CreateProjectDto } from '../dtos/projects/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';


export abstract class ProjectDatasource {
  abstract create(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
}