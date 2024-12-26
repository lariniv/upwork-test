import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { YoutubeModule } from './youtube/youtube.module';
import { HistoryModule } from './history/history.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [
    YoutubeModule,
    HistoryModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
})
export class AppModule {}
