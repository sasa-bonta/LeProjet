import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseCategoriesFromHtml from './utils/parseCategoriesFromHtml';

@Injectable()
export class CategoriesService {
  public async getCategories(lang = '') {
    const { data } = await axios.get(`https://enter.online/${lang}`);
    return parseCategoriesFromHtml(data);
  }
}
