import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(query: string) {
    const history = await this.prismaService.history.create({
      data: { query },
    });

    if (!history) {
      return 'Error saving history';
    }

    return history;
  }

  async getAll() {
    return this.prismaService.history.findMany();
  }
}
