import {Controller, Get, Query} from '@nestjs/common';
import {PriceService} from "./price.service";

@Controller('price')
export class PriceController {
    constructor(readonly priceService: PriceService) {
    }

    delay = (ms) => new Promise((res) => setTimeout(res, ms));

    @Get()
    getPrice(@Query('article') article, @Query('provider') providerName) {
        return this.priceService.getPrice(article, providerName);
    }

    @Get('test')
    async getPriceStubs() {
        await this.delay(1000);
        const rand = Math.floor(Math.random() * 12);
        if (rand < 2) {
            return Math.floor(Math.random() * 150) + 250;
        } else {
            return 369;
        }
    }
}
