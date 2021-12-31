// import { parse } from 'fast-xml-parser';
// import { decode } from 'he';
//
// const options = {
//   attributeNamePrefix: '@_',
//   attrNodeName: 'attr', //default is 'false'
//   textNodeName: '#text',
//   ignoreAttributes: true,
//   ignoreNameSpace: false,
//   allowBooleanAttributes: false,
//   parseNodeValue: true,
//   parseAttributeValue: false,
//   trimValues: true,
//   cdataTagName: '__cdata', //default is 'false'
//   cdataPositionChar: '\\c',
//   parseTrueNumberOnly: false,
//   numParseOptions: {
//     hex: true,
//     leadingZeros: true,
//     skipLike: /\+[0-9]{10}/,
//   },
//   attrValueProcessor: (val) => decode(val, { isAttributeValue: true }), //default is a=>a
//   tagValueProcessor: (val) => decode(val), //default is a=>a
// };
// export default (html) => {
//   const jsonObj = parse(html, options);
//   return [...new Set(jsonObj.urlset.url.map(({ loc }) => loc))];
// };
//
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
      subCategories: subCategories,
    });
  });

  return result;
};
