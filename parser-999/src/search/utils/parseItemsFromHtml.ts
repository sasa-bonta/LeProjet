import cheerio from "cheerio";

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];
  $("li.ads-list-photo-item").not(".js-booster-inline").each(function () {
    if (!$(this).find('span.booster-label').length) {
      const price = $(this).find('div.ads-list-photo-item-price').text();
      if (price.includes("леев") || price.includes("лея") || price.includes("lei") || price.includes("leu")) {
        result.push({
          name: $(this).find('div.ads-list-photo-item-title').text().trim(),
          price: price.replace(/леев|лея|lei|leu|\s/g, '').trim(),
          image: $(this).find('div.ads-list-photo-item-thumb img').attr('src').split("?metadata=")[0],
          url: 'https://999.md/' + $(this).find('div.ads-list-photo-item-title a').attr('href'),
        });
      }
    }
  });
  return result;
};
