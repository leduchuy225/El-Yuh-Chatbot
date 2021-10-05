import { Router } from "express";
import { Horoscope } from "../const";
import {
  crawlHoroscopeTodayFromLichNgayTotVn,
  createDailyHoroScropeForm,
} from "../ultility/horoscope";

const router = Router();

router.get("/", async (_, res) => {
  const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
  res.json(createDailyHoroScropeForm(data));
});

export default router;
