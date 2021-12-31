import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];

  $('ul.first-level > li.first-level').each(function (i, categoryItem) {
    const subCategories = [];

    $('div.megameu.uk-margin-top-remove')
      .eq(i)
      .find('ul.uk-subnav')
      .each(function (i2, subCategoryItem) {
        const items = [];

        $(subCategoryItem)
          .find('li.second-sublevel > a')
          .each(function () {
            items.push($(this).text().trim());
          });

        subCategories.push({
          title: $(subCategoryItem).find('li.second-level > a').text().trim(),
          items: items,
        });
      });

    result.push({
      category: $(categoryItem).find('a').text().trim(),
      sub_categories: subCategories,
    });
  });

  return result;
};
