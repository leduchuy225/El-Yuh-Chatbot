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

  const $ = load(data);

  const image = $("#content_1 > div.menu_down_sub.show td img").attr("src");
  const horoscope = $("#content_1 > div.menu_down_sub.show > .entry")
    .text()
    .split("\n")
    .map((text) => text.trim())
    .filter((text) => !!text);

  const [title, subTitle, ...predictions] = horoscope;

  return {
    title,
    subTitle,
    image,
    prediction: predictions.map((item) => {
      const [category, content] = item.split(":", 2);
      return { category, content };
    }),
  };
};

export const createDailyHoroScropeForm = (data: HoroscopeData) => {
  let form = "";
  form += "✡ " + data.title + " ✡" + "\n" + data.subTitle + "\n\n";
  data.prediction.map((item) => {
    form += "✯ " + item.category + " ✯" + "\n" + item.content + "\n\n";
  });
  return form;
};
