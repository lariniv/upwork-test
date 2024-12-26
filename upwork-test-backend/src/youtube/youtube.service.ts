import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HistoryService } from 'src/history/history.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class YoutubeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
    private readonly configService: ConfigService,
  ) {}
  async searchByQuery(
    query: string,
    pageToken?: string,
    maxResults: number = 10,
  ) {
    try {
      const params = pageToken
        ? {
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: maxResults,
            pageToken: pageToken,
            key: this.configService.get<string>('GOOGLE_API_KEY'),
          }
        : {
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: maxResults,
            key: this.configService.get<string>('GOOGLE_API_KEY'),
          };

      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params,
        },
      );

      const data = response.data;

      const results = data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.default.url,
      }));

      if (!results) {
        return 'No results found';
      }

      await this.historyService.create(query);

      const analytic = await this.prismaService.analytic.create({
        data: { query, count: maxResults },
      });

      if (!analytic) {
        return 'Error saving analytic';
      }

      return {
        results: results,
        totalResults: data.pageInfo.totalResults,
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPage ? data.prevPage : null,
      };
    } catch (err) {
      return err;
    }
  }

  async findVideo(id: string) {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            part: 'snippet,statistics',
            id: id,
            key: this.configService.get<string>('GOOGLE_API_KEY'),
          },
        },
      );

      const data = response.data.items.find((item) => item.id === id);

      return {
        videoId: id,
        title: data.snippet.title,
        description: data.snippet.description,
        thumbnailUrl: data.snippet.thumbnails.default.url,
        publishedAt: data.snippet.publishedAt,
        viewCount: data.statistics.viewCount,
        likeCount: data.statistics.likeCount,
        commentCount: data.statistics.commentCount,
      };
    } catch (error) {
      return error;
    }
  }
}
