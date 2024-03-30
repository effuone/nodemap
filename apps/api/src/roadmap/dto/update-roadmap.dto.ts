import { PartialType } from '@nestjs/mapped-types';
import { CreateRoadmapDto } from './create-roadmap.dto';

export class UpdateRoadmapDto extends PartialType(CreateRoadmapDto) {
  id: number;
}
