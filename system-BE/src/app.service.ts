import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      'Hello system-BE! <br> ' +
      'http://localhost:5000/categories <br> ' +
      'http://localhost:3000/shops <br> ' +
      'http://localhost:3000/search?search=iphone <br> ' +
      'http://localhost:3000/page?link=/ru/photo-video/obektivy/ <br>' +
      'http://localhost:3000/currencies?date=01.12.2021'
    );
  }
}
