const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to my app");
});

app.use("/", require("./src/web-hook"));
app.use("/news", require("./src/news"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
