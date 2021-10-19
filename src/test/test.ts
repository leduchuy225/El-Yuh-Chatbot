import axios from "axios";
import { load } from "cheerio";
import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  /* const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
  res.json(createDailyHoroScropeForm(data)); */

  /* const image = await getRandomMemeOnMemedroid();
  res.send(image); */

  // await crawlData();
  res.send("Hello world");
});

/* const crawlData = async () => {
  const { data } = await axios.get(
    "https://lichngaytot.com/cung-hoang-dao.html"
  );

  const $ = load(data);
  const list: object[] = [];
  $(".boxs-tu-vi a").each((_, item) => {
    if ($(item).attr("href")) {
      list.push({
        [$(item).attr("title") as string]: ($(item).attr("href") as string)
          ?.split("/")[2]
          .split(".")[0],
      });
    }
  });

  console.log(list);
};
 */
export default router;
