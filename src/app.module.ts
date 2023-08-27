import { Module } from '@nestjs/common';
import { HistoryModule } from './modules/history/history.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
@Module({
  imports: [HistoryModule, BookmarkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
