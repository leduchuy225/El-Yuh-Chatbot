import { Router } from "express";
import { getRandomMemeOnMemedroid } from "./../ultility/random-meme";

const router = Router();

router.get("/", async (_, res) => {
  /* const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
  res.json(createDailyHoroScropeForm(data)); */

  const image = await getRandomMemeOnMemedroid();
  res.send(image);
});

export default router;
