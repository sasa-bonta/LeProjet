import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(protected pageService: PageService) {}

  @Get()
  getItemsPerPage(@Query('link') link, @Query('page') page) {
    return this.pageService.getItemsOnPage(link, page);
  }
}
