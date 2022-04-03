import cheerio from "cheerio";

export default (html) => {
    const $ = cheerio.load(html);
    return $("span.adPage__content__price-feature__prices__price__value").last().text().trim().replace(/\s/g, '');
};
