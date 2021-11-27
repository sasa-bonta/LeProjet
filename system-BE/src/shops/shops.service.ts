import { Injectable } from '@nestjs/common';
import providers from '../constants/providers';

@Injectable()
export class ShopsService {
  getShops() {
    return providers.map((shop) => shop.name);
  }
}
