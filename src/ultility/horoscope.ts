import axios from "axios";
import { load } from "cheerio";
import { Horoscope } from "./../const";

interface PredictionItem {
  category: string;
  content: string;
}

interface HoroscopeData {
  title: string;
  subTitle: string;
  image?: string;
  prediction: PredictionItem[];
}

export const crawlHoroscopeTodayFromLichNgayTotVn = async (
  type: Horoscope
): Promise<HoroscopeData> => {
  const url = `https://lichngaytot.com/cung-hoang-dao/${type}.html`;
  const { data } = await axios.get(url);
  const prediction: PredictionItem[] = [];

  const $ = load(data);

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
  $("#content_1 > div.menu_down_sub.show > .entry > div strong").each(
    (_, item) => {
      prediction.push({
        category: $(item).text(),
        content: (item.next as any).data.slice(2),
      });
    }
  );

  return { title, subTitle, image, prediction };
};

export const createDailyHoroScropeForm = (data: HoroscopeData) => {
  let form = "";
  form += "✡ " + data.title + " ✡" + "\n" + data.subTitle + "\n\n";
  data.prediction.map((item) => {
    form += "✯ " + item.category + " ✯" + "\n" + item.content + "\n\n";
  });
  return form;
};
