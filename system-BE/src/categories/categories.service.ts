import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { categoriesListStub } from './stubs/categoriesStubs';
import { categoriesItemsStubs } from './stubs/categoriesItemsStubs';
import { categoriesItemsUrlsStubs } from './stubs/categoriesItemsUrlsStubs';

@Injectable()
export class CategoriesService {
  public async getCategories() {
    return (await axios.get('http://localhost:5000/categories')).data;
  }

  public async getCategoriesStubs() {
    const categoriesList = [];
    categoriesListStub.forEach((category) => {
      if (category.includes('/ru/')) {
        categoriesList.push(category.slice(24));
      }
    });
    return categoriesList;
  }

  public async getCategoriesItemsStubs() {
    return categoriesItemsStubs;
  }

  public async getCategoriesItemsUrlsStubs() {
    return categoriesItemsUrlsStubs;
  }
}
