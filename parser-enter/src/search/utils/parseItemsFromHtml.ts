import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];

  $('.grid-item').each(function () {
    console.log($(this).find('.price').clone().children().remove().end().text())
    result.push({
      name: $(this).find('.product-title').text().trim(),
      price: $(this).find('.price, .price-new').clone().children().remove().end().text().trim().replace(/\s/g, ''),
      image: $(this).find('.cm-image').attr('data-src'),
      url: $(this).find('a').attr('href'),
    });
  });

  return result;
};
