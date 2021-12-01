import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ShopsModule } from './shops/shops.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [SearchModule, ShopsModule, CurrenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
