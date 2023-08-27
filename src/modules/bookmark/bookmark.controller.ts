import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) { }

  @Post()
  async create(@Body() data: BookmarkDTO) {
    return this.bookmarkService.create(data);
  }

  @Get()
  async findAll() {
    return this.bookmarkService.findAll();
  }

  @Delete()
  async delete(@Body() data: BookmarkDTO) {
    return this.bookmarkService.delete(data);
  }
}
