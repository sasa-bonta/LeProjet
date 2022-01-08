import { Injectable } from '@nestjs/common';
import axios from 'axios';
import providers from '../constants/providers';

@Injectable()
export class SearchService {
  async searchItemsEverywhere(search, page = 1) {
    let result = [];
    for (const provider of providers) {
      if (!(+page === 1 || (page > 1 && provider.paginated))) {
        continue;
      }
      try {
        let providerData = (
          await axios.get(`${provider.url}search?search=${search}&page=${page}`)
        ).data;
        providerData = providerData.map((e) => ({
          ...e,
          provider: provider.name,
        }));
        result = result.concat(providerData);
      } catch (err) {
        console.log(err);
        console.log(`Parser ${provider} doesn't work`);
      }
    }
    return result;
  }
}
