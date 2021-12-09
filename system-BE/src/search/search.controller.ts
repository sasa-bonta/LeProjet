import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { items } from './itemsStubs';

@Controller('search')
export class SearchController {
  constructor(readonly searchService: SearchService) {}

  @Get()
  searchItems(@Query('search') search, @Query('page') page) {
    return this.searchService.searchItemsEverywhere(search, page);
  }

  @Get('test')
  searchItemsStubs() {
    return items;
  }
}
