const { Horoscope } = require("../src/const");
const {
  crawlHoroscopeTodayFromLichNgayTotVn,
  createDailyHoroScropeForm,
} = require("../src/ultility/horoscope");

const router = require("express").Router();

router.get("/", async (_, res) => {
  const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
  res.json(createDailyHoroScropeForm(data));
});

module.exports = router;
