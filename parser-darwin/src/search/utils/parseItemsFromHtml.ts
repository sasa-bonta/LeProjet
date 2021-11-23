import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];
  $('.card-product').each(function () {
    result.push({
      name: $(this).find('.title a').text().trim(),
      price: $(this).find('.price-new b').text().trim(),
      image: $(this).find('.card-image').attr('src'),
      url: $(this).find('.title a').attr('href'),
    });
  });
  return result;
};
