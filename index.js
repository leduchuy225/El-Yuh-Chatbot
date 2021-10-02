const express = require("express");

const PORT = 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.use("/news", require("./src/news"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
