import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class RoadmapGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly roadmapService: RoadmapService) {}
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createRoadmap')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody() userPrompt: string,
  ): Promise<void> {
    await this.roadmapService.create(userPrompt, (streamData) => {
      console.log(streamData);
      client.emit('streamData', streamData);
    });
  }

  @SubscribeMessage('findAllRoadmap')
  findAll() {
    return this.roadmapService.findAll();
  }

  @SubscribeMessage('findOneRoadmap')
  findOne(@MessageBody() id: number) {
    return this.roadmapService.findOne(id);
  }

  @SubscribeMessage('updateRoadmap')
  update(@MessageBody() updateRoadmapDto: UpdateRoadmapDto) {
    return this.roadmapService.update(updateRoadmapDto.id, updateRoadmapDto);
  }

  @SubscribeMessage('removeRoadmap')
  remove(@MessageBody() id: number) {
    return this.roadmapService.remove(id);
  }
}
