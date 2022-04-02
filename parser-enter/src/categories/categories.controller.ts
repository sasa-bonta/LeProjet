import {Controller, Get, Query} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query('lang') lang) {
    return this.categoriesService.getCategories(lang);
  }
}
