import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello parser-999!<br>localhost:3000/search?search=iphone<br>localhost:3000/price?article=https://999.md//ru/71639782';
  }
}
