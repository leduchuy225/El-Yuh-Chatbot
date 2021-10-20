import { WebHookService } from "./../service/webhook.service";
import { Request, Response, Router } from "express";
import { VERIFY_TOKEN } from "../config/const";
import { messenger } from "../service/messenger.service";

export class WebHookController {
  public router;
  private webHookService;

  constructor() {
    this.router = Router();
    this.webHookService = new WebHookService();
    this.setRoutes();
  }

  postWebhook = (req: Request, res: Response) => {
    const body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(async (entry: any) => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        const webhookEvent = entry.messaging[0];

        console.log(webhookEvent);

        const senderPsid = webhookEvent.sender.id;
        const payload = webhookEvent?.postback?.payload;

        if (payload) {
          this.webHookService.handlePayload(payload, senderPsid);
          return;
        }

        messenger.sendSelectButton(senderPsid);
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send("EVENT_RECEIVED");
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  };

  getWebhook = (req: Request, res: Response) => {
    // Parse the query params
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  };

  setRoutes = () => {
    this.router.get("/webhook", this.getWebhook);
    this.router.post("/webhook", this.postWebhook);
  };
}
