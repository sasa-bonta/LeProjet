import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];
  $('.product').each(function () {
    result.push({
      name: $(this).find('.name').text().trim(),
      price: $(this).find('.price-new').text().trim().slice(4),
      image: 'https://shopit.md' + $(this).find('img').attr('src'),
      url: $(this).find('a').attr('href'),
    });
  });
  return result;
};
