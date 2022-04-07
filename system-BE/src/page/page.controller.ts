import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';
import { pageListStub } from './stubs/pageStubs';
import axios from 'axios';
import { goServer } from '../constants/imageProcessorUrl';

@Controller('page')
export class PageController {
  constructor(protected pageService: PageService) {
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  @Get()
  getItemsPerPage(@Query('link') link, @Query('page') page) {
    return this.pageService.getItemsOnPage(link, page).then(function (items) {
      return axios
          .post(
              goServer,
              items.map((el) => el.image),
          )
          .then(function (r) {
          console.log(r.data);
          return items.map((el) => ({
            name: el.name,
            image:
              'http://localhost:3000/public/' +
              el.image.replace('https://', '').replace(/\//g, '^_^'),
          }));
        });
    });
  }

  @Get('test')
  async getItemsPerPageStubs() {
    await this.delay(1000);
    return pageListStub;
  }
}
