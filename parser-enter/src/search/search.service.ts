import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseItemsFromHtml from './utils/parseItemsFromHtml';

@Injectable()
export class SearchService {
  async searchItems(search, page = 1) {
    const result = await axios.get(
      `https://enter.online/ru/poisk/?q=${search}&page=${page}`,
    );
    return parseItemsFromHtml(result.data);
  }
}
