import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { PageModule } from './page/page.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [CategoriesModule, PageModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
