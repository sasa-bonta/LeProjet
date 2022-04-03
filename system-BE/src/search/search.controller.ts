import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import axios from 'axios';
import {goServer} from '../constants/imageProcessorUrl';
import {itemsStubs2} from "./stubs/itemsStubs2";

@Controller('search')
export class SearchController {
  constructor(readonly searchService: SearchService) {
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  @Get()
  searchItems(@Query('search') search, @Query('page') page) {
    return this.searchService
        .searchItemsEverywhere(search, page)
        .then(function (items) {
          return axios
              .post(
                  goServer,
                  items.map((el) => el.image),
          )
          .then(function (r) {
            console.log(r.data);
            return items.map((el) => ({
              name: el.name,
              provider: el.provider,
              price: el.price,
              url: el.url,
              image:
                'http://localhost:3000/public/' +
                el.image.replace('https://', '').replace(/\//g, '^_^'),
            }));
          });
      });
  }

  @Get('test')
  async searchItemsStubs() {
    await this.delay(2000);
    return itemsStubs2;
  }
}
