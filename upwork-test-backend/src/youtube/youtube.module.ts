import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HistoryService } from 'src/history/history.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [YoutubeController],
  providers: [YoutubeService, PrismaService, HistoryService],
})
export class YoutubeModule {}
