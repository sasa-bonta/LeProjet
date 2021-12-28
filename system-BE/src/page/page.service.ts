import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PageService {
  async getItemsOnPage(link: string) {
    return (await axios.get(`http://localhost:5000/page?link=${link}`)).data;
  }
}
