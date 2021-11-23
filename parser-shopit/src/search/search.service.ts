import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseItemsFromHtml from './utils/parseItemsFromHtml';

@Injectable()
export class SearchService {
  async searchItems(search) {
    const result = await axios.get(
      `https://shopit.md/ru/katalog/search/?query=${search}`,
    );
    return parseItemsFromHtml(result.data);
  }
}
