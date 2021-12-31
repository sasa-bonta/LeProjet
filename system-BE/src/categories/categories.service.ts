import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { categoriesItemsUrlsStubs } from './stubs/categoriesItemsUrlsStubs';

@Injectable()
export class CategoriesService {
  public async getCategories() {
    return (await axios.get('http://localhost:5000/categories')).data;
  }

  public async getCategoriesItemsUrlsStubs() {
    return categoriesItemsUrlsStubs;
  }
}
