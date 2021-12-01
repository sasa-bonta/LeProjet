import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parceRatesFromXml from './utils/parceRatesFromXml';

@Injectable()
export class CurrenciesService {
  async searchRates(date) {
    const result = await axios.get(
      `https://www.bnm.md/ro/official_exchange_rates?get_xml=1&date=${date}`,
    );
    return parceRatesFromXml(result.data);
  }
}
