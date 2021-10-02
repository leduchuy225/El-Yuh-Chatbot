const { default: axios } = require("axios");
const { crawlLastestNewsFromThanhNienVn } = require("./utility");

const router = require("express").Router();

router.get("/", async (_, res) => {
  const { data } = await axios.get(
    "https://thanhnien.vn/api/contents/get/latest",
    {
      headers: { "accept-encoding": "gzip, deflate, br" },
    }
  );
  const html = data.data.articles;
  res.json(crawlLastestNewsFromThanhNienVn(html));
});

module.exports = router;
