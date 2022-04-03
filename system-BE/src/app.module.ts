import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ShopsModule } from './shops/shops.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CategoriesModule } from './categories/categories.module';
import {PageModule} from './page/page.module';
import {PriceModule} from './price/price.module';

@Module({
  imports: [
      SearchModule,
      ShopsModule,
      CurrenciesModule,
      CategoriesModule,
      PageModule,
      PriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
