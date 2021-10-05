const dayjs = require("dayjs");
const express = require("express");
const { PORT } = require("./src/const");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to my app");
});

app.use("/", require("./src/web-hook"));
app.use("/test", require("./test/test"));

app.listen(PORT, () => {
  console.log("Current time:", dayjs().format());
  console.log(`Listening on port ${PORT}`);
});
