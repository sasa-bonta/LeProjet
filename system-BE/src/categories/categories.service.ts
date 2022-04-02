import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CategoriesService {
  public async getCategories(lang = '') {
    return (await axios.get(`http://localhost:5000/categories?lang=${lang}`)).data;
  }
}
