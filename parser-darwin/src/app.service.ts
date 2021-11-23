import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello darwin-parser! <br> http://localhost:3000/search?search=iphone&page=2';
  }
}
