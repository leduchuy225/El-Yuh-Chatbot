const cheerio = require("cheerio");
const { default: axios } = require("axios");

exports.crawlHoroscopeTodayFromLichNgayTotVn = async (type) => {
  const url = `https://lichngaytot.com/cung-hoang-dao/${type}.html`;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const title = $("#content_1 > div.menu_down_sub.show > div > h3")
    .text()
    .trim();

  const image = $(
    "#content_1 > div.menu_down_sub.show > div > div:nth-child(4) > div > table > tbody > tr:nth-child(1) > td > img"
  ).attr("src");

  const subTitle = $(
    "#content_1 > div.menu_down_sub.show > div > div:nth-child(4)"
  )
    .text()
    .trim();

  const prediction = [];
  $("#content_1 > div.menu_down_sub.show > .entry > div strong").each(
    (_, item) => {
      prediction.push({
        category: $(item).text(),
        content: item.next.data.slice(2),
      });
    }
  );

  return { title, subTitle, url, image, prediction };
};

exports.createDailyHoroScropeForm = (data) => {
  let form = "";
  form += "✡ " + data.title + " ✡" + "\n" + data.subTitle + "\n\n";
  data.prediction.map((item) => {
    form += "✯ " + item.category + " ✯" + "\n" + item.content + "\n\n";
  });
  return form;
};
