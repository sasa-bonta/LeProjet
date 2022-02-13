import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseItemsFromHtml from '../search/utils/parseItemsFromHtml';
import filterProductNames from '../categories/utils/filterProductNames';

@Injectable()
export class PageService {
  async getItemsOnPage(link: string, page = 1 ) {
    const { data } = await axios.get(
      `https://enter.online${link}?page=${page}`,
    );
    return filterProductNames(
      parseItemsFromHtml(data),
    );
  }
}
