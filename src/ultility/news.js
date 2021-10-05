const cheerio = require("cheerio");
const { default: axios } = require("axios");
const dayjs = require("dayjs");
const { DATE_FORMAT } = require("../const");

exports.crawlLastestNewsFromThanhNienVn = async (number) => {
  const { data } = await axios.get(
    "https://thanhnien.vn/api/contents/get/latest",
    {
      headers: { "accept-encoding": "gzip, deflate, br" },
    }
  );

  try {
    const articles = [];
    const $ = cheerio.load(data.data.articles);
    $(".story--text").each((_, article) => {
      const item = {
        id: $(article).attr("rel"),
        name: $(article).find("a").text().trim(),
        time:
          dayjs().format(DATE_FORMAT) +
          " " +
          $(article).find(".meta time").text().trim(),
        link: $(article).find("a").attr("href"),
      };
      articles.push(item);
    });
    return articles.slice(0, number);
  } catch {
    return [];
  }
};
