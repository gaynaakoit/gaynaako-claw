import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [RedisModule], 
  providers: [MemoryService],
  exports: [MemoryService], // pour injecter dans d'autres services
})
export class MemoryModule {}
