const { VERIFY_TOKEN } = require("./const");
const { messenger } = require("./message");
const { crawlLastestNewsFromThanhNienVn } = require("./utility");

const router = require("express").Router();

router.post("/webhook", (req, res) => {
  const body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(async function (entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      const senderPsid = webhookEvent.sender.id;

      const data = await crawlLastestNewsFromThanhNienVn();

      if (data && data.length) {
        messenger.callSendAPI(senderPsid, {
          text: data[0].name + "\n" + data[0].link,
        });
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

module.exports = router;
