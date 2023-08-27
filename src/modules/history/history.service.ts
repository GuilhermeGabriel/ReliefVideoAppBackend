import { Injectable, BadRequestException } from '@nestjs/common';
import { HistoryDTO } from './history.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) { }

  async create(data: HistoryDTO) {
    const historyExists = await this.prisma.history.findUnique({
      where: {
        url: data.url
      }
    });

    if (historyExists) {
      throw new BadRequestException(
        'Item already exists'
      )
    }

    const history = await this.prisma.history.create({
      data
    });

    return history
  }

  async delete(data: HistoryDTO) {
    const history = await this.prisma.history.findUnique({
      where: {
        url: data.url
      }
    });

    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        url: data.url
      }
    });

    if (bookmark) {
      await this.prisma.bookmark.delete({
        where: {
          url: data.url
        }
      });
    }

    if (!history) {
      throw new BadRequestException(
        'Item does not exist'
      )
    }

    await this.prisma.history.delete({
      where: {
        url: data.url
      }
    });

    return history
  }

  async findAll() {
    const history = await this.prisma.history.findMany();
    const urls = history.map(item => item.url);
    return urls;
  }
}
