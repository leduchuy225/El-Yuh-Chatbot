import { Router } from "express";
import { DOMAIN_NAME, GET_STARTED, Menu, VERIFY_TOKEN } from "./const";
import { messenger } from "./messenger/messenger";
import { messengerUltility } from "./messenger/messenger-ultility";

const router = Router();

router.post("/webhook", (req, res) => {
  const body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(async function (entry: any) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      const webhookEvent = entry.messaging[0];

      console.log(webhookEvent);

      const senderPsid = webhookEvent.sender.id;
      const payload = webhookEvent?.postback?.payload;
      if (payload) {
        switch (payload) {
          case GET_STARTED:
            messenger.setPersistentMenu(senderPsid);
            messenger.setSelectButton(senderPsid);
            return;
          case Menu.NEWS:
            messengerUltility.sendNews(senderPsid);
            return;
          case Menu.HOROSCOPE:
            messengerUltility.sendHoroscopeForToday(senderPsid);
            return;
          case Menu.MEME:
            messengerUltility.sendRandomMeme(senderPsid);
            return;
        }
      } else {
        if (webhookEvent?.message?.text === "testing") {
          const response = {
            type: "template",
            payload: {
              template_type: "button",
              text: "For testing purpose",
              buttons: [
                {
                  type: "web_url",
                  url: DOMAIN_NAME + "/web-view/user",
                  title: "Test web-view",
                  webview_height_ratio: "compact",
                  messenger_extensions: true,
                },
              ],
            },
          };
          messenger.callSendAPI(senderPsid, { attachment: response });
          return;
        }

        messenger.setSelectButton(senderPsid);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

router.get("/webhook", (req, res) => {
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
});

export default router;
