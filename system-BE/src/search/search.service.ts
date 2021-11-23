import { Injectable } from '@nestjs/common';
import axios from 'axios';
import providers from '../constants/providers';

@Injectable()
export class SearchService {
  async searchItemsEverywhere(search) {
    let result = [];
    for (const provider of providers) {
      let providerData = (
        await axios.get(`${provider.url}search?search=${search}`)
      ).data;
      providerData = providerData.map((e) => ({
        ...e,
        provider: provider.name,
      }));
      result = result.concat(providerData);
    }
    return result;
  }
}
