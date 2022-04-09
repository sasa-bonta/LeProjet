import { Injectable } from '@nestjs/common';
import axios from 'axios';
import providers from '../constants/providers';

@Injectable()
export class PriceService {
  async getPrice(article, providerName) {
    const provider = providers.find((obj) => obj.name === providerName);
    return (await axios.get(`${provider.url}price?article=${article}`)).data;
  }
}
