import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesItemsUrlsStubs } from './stubs/categoriesItemsUrlsStubs';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('test')
  async getCategoriesItemsUrlsStubs() {
    await this.delay(500);
    return categoriesItemsUrlsStubs;
  }
}
