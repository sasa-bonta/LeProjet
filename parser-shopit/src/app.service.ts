import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello parser-shopit! <br> http://localhost:3000/search?search=iphone';
  }
}
