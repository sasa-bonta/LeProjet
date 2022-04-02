import cheerio from 'cheerio';

export default (html) => {
  const $ = cheerio.load(html);
  const result = [];

  $('ul.first-level > li.first-level').each(function (i, categoryItem) {
    const subCategories = [];

    $('ul.uk-nav')
      .eq(i)
      .find('li')
      .each(function (i2, subCategoryItem) {
        const items = [];

        $(subCategoryItem)
          .find('div.uk-nav > a')
          .each(function () {
            items.push({
              item: $(this).text().trim(),
              url: $(this).attr('href').substr(20),
            });
          });

        subCategories.push({
          title: $(subCategoryItem).find('a.level2').text().trim(),
          url: $(subCategoryItem).find('a.level2').attr('href')?.substr(20),
          items: items,
        });
      });

    result.push({
      category: $(categoryItem).find('a.fa-chevron-right').text().trim(),
      url: $(categoryItem).find('a.fa-chevron-right').attr('href').substr(20),
      sub_categories: subCategories,
    });
  });

  return result;
};
