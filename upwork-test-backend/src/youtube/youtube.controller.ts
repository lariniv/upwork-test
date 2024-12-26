import { Controller, Get, Param, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller()
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('pageToken') pageToken?: string,
    @Query('maxResults') maxResults?: number,
  ) {
    return this.youtubeService.searchByQuery(query, pageToken, maxResults);
  }

  @Get('video/:id')
  async video(@Param('id') id: string) {
    return this.youtubeService.findVideo(id);
  }
}
