import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { itemsStubs } from './stubs/itemsStubs';
import axios from 'axios';
import { goServer } from '../constants/imageProcessorUrl';

@Controller('search')
export class SearchController {
  constructor(readonly searchService: SearchService) {}
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
                el.image.replace('https://', '').split('/',).join('^_^'),
            }));
          });
      });
  }

  @Get('test')
  searchItemsStubs() {
    return itemsStubs;
  }
}
