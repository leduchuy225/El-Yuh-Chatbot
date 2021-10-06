import axios from "axios";
import { load } from "cheerio";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../const";
import { NUMBER_OF_NEWS } from "./../const";

interface ArticleData {
  id: string;
  name: string;
  time: string;
  link: string;
}

export const crawlLastestNewsFromThanhNienVn = async () => {
  const { data } = await axios.get(
    "https://thanhnien.vn/api/contents/get/latest",
    {
      headers: { "accept-encoding": "gzip, deflate, br" },
    }
  );

  try {
    const articles: ArticleData[] = [];
    const $ = load((data as any).data.articles);

    $(".story--text").each((_, article) => {
      const item = {
        id: $(article).attr("rel"),
        name: $(article).find("a").text().trim(),
        time:
          dayjs().format(DATE_FORMAT) +
          " " +
          $(article).find(".meta time").text().trim(),
        link: $(article).find("a").attr("href"),
      } as ArticleData;
      articles.push(item);
    });

    return articles.slice(0, NUMBER_OF_NEWS);
  } catch {
    return [];
  }
};
