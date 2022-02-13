import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PageService {
  async getItemsOnPage(link: string, page = 1) {
    return (await axios.get(`http://localhost:5000/page?link=${link}&page=${page}`)).data;
  }
}
