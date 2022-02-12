import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];

  $('ul.first-level > li.first-level').each(function (i, categoryItem) {
    const subCategories = [];

    $('div.tm-megamenu-level2')
      .eq(i)
      .find('ul.uk-subnav')
      .each(function (i2, subCategoryItem) {
        const items = [];

        $(subCategoryItem)
          .find('li.second-sublevel > a')
          .each(function () {
            items.push({
              item: $(this).text().trim(),
              url: $(this).attr('href'),
            });
          });

        subCategories.push({
          title: $(subCategoryItem).find('li.second-level > a').text().trim(),
          url: $(subCategoryItem).find('li.second-level > a').attr('href'),
          items: items,
        });
      });

    result.push({
      category: $(categoryItem).find('a').text().trim(),
      url: $(categoryItem).find('a').attr('href'),
      sub_categories: subCategories,
    });
  });

  return result;
};
