import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];

  $('ul.first-level > li.first-level').each(function (i, categoryItem) {
    const subCategories = [];

    $('li.second-level')
      .eq(i)
      .find('ul')
      .each(function (i2, subCategoryItem) {
        const items = [];

        $(subCategoryItem)
          .find('a')
          .each(function () {
            items.push({
              item: $(this).text().trim(),
              url: $(this).attr('href').replace('https://enter.online', ''),
            });
          });

        subCategories.push({
          title: $(subCategoryItem).find('li.second-level > a').text().trim(),
          url: $(subCategoryItem).find('li.second-level > a').attr('href')?.replace('https://enter.online', ''),
          items: items,
        });
      });

    result.push({
      category: $(categoryItem).find('a').text().trim(),
      url: $(categoryItem).find('a').attr('href').replace('https://enter.online', ''),
      sub_categories: subCategories,
    });
  });

  return result;
};
