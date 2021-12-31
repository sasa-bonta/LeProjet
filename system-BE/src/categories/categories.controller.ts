import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('cat')
  getCategoriesStubs() {
    return this.categoriesService.getCategoriesStubs();
  }

  @Get('item')
  getCategoriesItemsStubs() {
    return this.categoriesService.getCategoriesItemsStubs();
  }

  @Get('url')
  getCategoriesItemsUrlsStubs() {
    return this.categoriesService.getCategoriesItemsUrlsStubs();
  }
}
