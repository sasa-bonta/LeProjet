import { Controller, Get } from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(readonly shopsService: ShopsService) {}

  @Get()
  getShops() {
    return this.shopsService.getShops();
  }
}
