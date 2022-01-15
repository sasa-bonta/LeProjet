import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';
import { pageListStub } from './stubs/pageStubs';

@Controller('page')
export class PageController {
  constructor(protected pageService: PageService) {}

  @Get()
  getItemsPerPage(@Query('link') link) {
    return this.pageService.getItemsOnPage(link).then(function (items) {
      return items.map((el) => ({
        name: el.name,
        image:
          'http://localhost:3000/public/' +
          el.image.replace('https://', '').replaceAll('/', '^_^'),
      }));
    });
  }

  @Get('test')
  getItemsPerPageStubs() {
    return pageListStub;
  }
}
