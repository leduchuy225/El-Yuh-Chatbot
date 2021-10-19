import { OrmConfig } from "./config/ormconfig";
import { WebViewController } from "./controller/web-view.controller";
import { WebHookController } from "./controller/web-hook.controller";
import dayjs from "dayjs";
import express from "express";
import { PORT, Stage } from "./config/const";
import { ConnectionOptions, createConnection } from "typeorm";
import { config } from "dotenv";

config();

class Server {
  private app;
  private webHookController!: WebHookController;
  private webViewController!: WebViewController;

  constructor() {
    this.app = express();
    this.setConfiguration();
    this.setRoutes();
  }

  setConfiguration = () => {
    this.app.use(express.json());
  };

  setRoutes = async () => {
    const isConnected = await this.connectToDatabase();

    this.app.get("/", (_, res) => {
      res.send("Welcome to my app");
    });

    this.webHookController = new WebHookController();
    this.app.use("/", this.webHookController.router);

    if (isConnected) {
      this.webViewController = new WebViewController();
      this.app.use("/webview", this.webViewController.router);
    }
  };

  connectToDatabase = async () => {
    let connectOptions: ConnectionOptions;

    console.log(process.env.STAGE);

    switch (process.env.STAGE) {
      case Stage.DEVELOPMENT:
        connectOptions = OrmConfig.development;
        break;
      case Stage.PRODUCTION:
        connectOptions = OrmConfig.production;
        break;
      default:
        return false;
    }

    return await createConnection(connectOptions)
      .then(() => {
        console.log("Connecting to database");
        return true;
      })
      .catch((err) => {
        console.log(err);
        console.log("Fail to connect to database");
        return false;
      });
  };

  start = () => {
    this.app.listen(PORT, () => {
      console.log("Current time:", dayjs().format());
      console.log(`Listening on port ${PORT}`);
    });
  };
}

const server = new Server();
server.start();
