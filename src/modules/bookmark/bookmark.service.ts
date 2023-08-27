import { Injectable, BadRequestException } from '@nestjs/common';
import { BookmarkDTO } from './bookmark.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) { }

  async create(data: BookmarkDTO) {
    const historyExists = await this.prisma.history.findUnique({
      where: {
        url: data.url
      }
    });

    if (!historyExists) {
      throw new BadRequestException(
        'Item does not exist to bookmark'
      )
    }

    const bookmarkExists = await this.prisma.bookmark.findUnique({
      where: {
        url: data.url
      }
    });

    if (bookmarkExists) {
      throw new BadRequestException(
        'Item already exists'
      )
    }

    const bookmark = await this.prisma.bookmark.create({
      data
    });

    return bookmark;
  }

  async delete(data: BookmarkDTO) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        url: data.url
      }
    });

    if (!bookmark) {
      throw new BadRequestException(
        'Item does not exist'
      )
    }

    await this.prisma.bookmark.delete({
      where: {
        url: data.url
      }
    });

    return bookmark;
  }

  async findAll() {
    return await this.prisma.bookmark.findMany();;
  }
}
