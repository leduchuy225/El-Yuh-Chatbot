import dayjs from "dayjs";
import express from "express";
import { PORT } from "./const";
import testRouter from "./test/test";
import { webHookController } from "./web-hook";
import { webViewController } from "./web-view";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.setConfiguration();
    this.setRoutes();
  }

  public setConfiguration = () => {
    this.app.use(express.json());
  };

  public setRoutes = () => {
    this.app.get("/", (_, res) => {
      res.send("Welcome to my app");
    });

    this.app.use("/", webHookController.router);
    this.app.use("/web-view", webViewController.router);

    this.app.use("/test", testRouter);
  };

  public start = () => {
    this.app.listen(PORT, () => {
      console.log("Current time:", dayjs().format());
      console.log(`Listening on port ${PORT}`);
    });
  };
}

const server = new Server();
server.start();
