import dayjs from "dayjs";
import express from "express";
import { PORT } from "./const";
import testRouter from "./test/test";
import webHookRouter from "./web-hook";
import webViewRouter from "./web-view";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to my app");
});

app.use("/", webHookRouter);
app.use("/test", testRouter);
app.use("/web-view", webViewRouter);

app.listen(PORT, () => {
  console.log("Current time:", dayjs().format());
  console.log(`Listening on port ${PORT}`);
});
