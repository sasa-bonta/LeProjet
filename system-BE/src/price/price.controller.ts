import {Controller, Get, Query} from '@nestjs/common';
import {PriceService} from "./price.service";

@Controller('price')
export class PriceController {
    constructor(readonly priceService: PriceService) {
    }

    @Get()
    getPrice(@Query('article') article, @Query('provider') providerName) {
        return this.priceService.getPrice(article, providerName);
    }

    @Get('test')
    getPriceStubs() {
        return Math.floor(Math.random() * 250) + 150;
    }
}
