import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { items } from './itemsStubs';
import axios from 'axios';

@Controller('search')
export class SearchController {
  constructor(readonly searchService: SearchService) {}
  @Get()
  searchItems(@Query('search') search, @Query('page') page) {
    const searchItems = this.searchService
      .searchItemsEverywhere(search, page)
      .then(function (items) {
        return axios
          .post(
            'http://localhost:4000/images',
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
                el.image.replace('https://', '').replaceAll('/', '^_^'),
            }));
          });
      });
    return searchItems;
  }

  @Get('test')
  searchItemsStubs() {
    return items;
  }
}
