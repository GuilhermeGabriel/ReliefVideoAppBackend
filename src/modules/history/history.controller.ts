import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDTO } from './history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Post()
  async create(@Body() data: HistoryDTO) {
    return this.historyService.create(data);
  }

  @Delete()
  async delete(@Body() data: HistoryDTO) {
    return this.historyService.delete(data);
  }

  @Get()
  async findAll() {
    return this.historyService.findAll();
  }
}
