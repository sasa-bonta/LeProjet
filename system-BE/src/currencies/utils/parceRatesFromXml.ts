import cheerio from 'cheerio';
import { currencies } from './currencies';

export default (html) => {
  const $ = cheerio.load(html, { xmlMode: true });
  const result = [];
  $('Valute').each(function () {
    const currentCurrency = $(this).find('CharCode').text();
    if (currencies.includes(currentCurrency)) {
      result.push({
        currency: currentCurrency,
        rate: $(this).find('Value').text(),
      });
    }
  });
  return result;
};
