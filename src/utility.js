const cheerio = require("cheerio");

exports.crawlLastestNewsFromThanhNienVn = (html) => {
  const data = [];
  const $ = cheerio.load(html);

  $(".story--text").each((_, article) => {
    const item = {
      id: $(article).attr("rel"),
      name: $(article).find("a").text().trim(),
      time: $(article).find(".meta time").text().trim(),
      link: $(article).find("a").attr("href"),
    };
    data.push(item);
  });

  return data;
};
