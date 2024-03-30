import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { RoadmapGateway } from './roadmap.gateway';

@Module({
  providers: [RoadmapGateway, RoadmapService],
})
export class RoadmapModule {}
