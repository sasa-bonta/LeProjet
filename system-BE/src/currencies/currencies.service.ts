import { Injectable } from '@nestjs/common';
import axios from 'axios';
import parseRatesFromXml from './utils/parceRatesFromXml';

@Injectable()
export class CurrenciesService {
  getTodayDate() {
    const today = new Date();
    const dd = today.getDate();
    let ddStr = String(dd);
    if (dd < 10) {
      ddStr = '0' + ddStr;
    }
    const mm = today.getMonth() + 1;
    let mmStr = String(mm);
    if (mm < 10) {
      mmStr = '0' + mmStr;
    }
    const year = today.getFullYear();
    return `${ddStr}.${mmStr}.${year}`;
  }

  async searchRates() {
    const result = await axios.get(
      `https://www.bnm.md/ro/official_exchange_rates?get_xml=1&date=${this.getTodayDate()}`,
    );
    return parseRatesFromXml(result.data);
  }
}
