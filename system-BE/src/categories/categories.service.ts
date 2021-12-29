import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { categoriesListStub } from './stubs/categoriesStubs';

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
}
