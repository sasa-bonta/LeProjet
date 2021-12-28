import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      '<h1>Hello system-BE!</h1><br> ' +
      '<h2>Production paths: </h2><br> ' +
      'http://localhost:3000/categories <br> ' +
      'http://localhost:5000/page?link=/ru/photo-video/obektivy/ <br>' +
      'http://localhost:3000/shops <br> ' +
      'http://localhost:3000/search?search=iphone <br> ' +
      'http://localhost:3000/currencies <br><hr><br>' +
      '<h2>Testing stub paths: </h2><br> ' +
      'http://localhost:3000/shops/test <br> ' +
      'http://localhost:3000/search/test <br> ' +
      'http://localhost:3000/currencies/test <br>' +
      'http://localhost:3000/categories/test <br>'
    );
  }
}
