import {Controller, Get, Query} from '@nestjs/common';
import {PriceService} from "./price.service";

@Controller('price')
export class PriceController {
    constructor(readonly priceService: PriceService) {
    }

    @Get()
    searchItems(@Query('article') article) {
        return this.priceService.searchPrice(article);
    }
}
