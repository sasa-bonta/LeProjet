import {Controller, Get, Query} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {categoriesRo} from './stubs/categoriesRo';
import {categoriesRu} from "./stubs/categoriesRu";
import {categoriesFr} from "./stubs/categoriesFr";
import {categoriesEn} from "./stubs/categoriesEn";

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {
    }

    delay = (ms) => new Promise((res) => setTimeout(res, ms));

    @Get()
    getCategories(@Query('lang') lang) {
        return this.categoriesService.getCategories(lang);
  }

  @Get('test')
  async getCategoriesItemsUrlsStubs(@Query('lang') lang) {

      await this.delay(500);

      if (lang === 'ru') {
          return categoriesRu;
      }

      if (lang === 'fr') {
          return categoriesFr;
      }

      if (lang === 'en') {
          return categoriesEn;
      }

      return categoriesRo;
  }
}
