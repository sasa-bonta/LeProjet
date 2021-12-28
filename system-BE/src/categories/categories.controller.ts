import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesListStub } from './stubs/categoriesStubs';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('test')
  getCategoriesStubs() {
    return categoriesListStub;
  }
}
