import { Controller, Get, Query } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(readonly currenciesService: CurrenciesService) {}

  @Get()
  getCurrencies(@Query('date') date) {
    return this.currenciesService.searchRates(date);
  }

  @Get('test')
  getCurrenciesStubs() {
    return [
      { currency: 'EUR', rate: '20.1160' },
      { currency: 'USD', rate: '17.7288' },
    ];
  }
}
