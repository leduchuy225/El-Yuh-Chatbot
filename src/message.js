const { default: axios } = require("axios");
const { PAGE_ACCESS_TOKEN, GET_STARTED, Menu } = require("./const.js");

class Messenger {
  BASE_URL = "https://graph.facebook.com/v2.6/me";
  TOKEN = PAGE_ACCESS_TOKEN;
  ListFunctions = [
    {
      title: "Get Newest News",
      payload: Menu.NEWS,
    },
    {
      title: "Daily Horoscrope",
      payload: Menu.HOROSCOPE,
    },
  ];

  call({ path, ...options }) {
    return axios({
      params: { access_token: this.TOKEN },
      url: this.BASE_URL + path,
      ...options,
    }).catch((err) => console.log(err));
  }

  post(path, data) {
    return this.call({ method: "post", path, data });
  }

  callSendAPI(senderPsid, response) {
    this.post("/messages", {
      recipient: { id: senderPsid },
      message: response,
    });
  }

  setGetStartedPayload() {
    this.post("/messenger_profile", {
      get_started: { payload: GET_STARTED },
    });
  }

  setSelectButton(senderPsid) {
    const data = {
      type: "template",
      payload: {
        template_type: "button",
        text: "How can I help you ?",
        buttons: this.ListFunctions.map((item) => ({
          ...item,
          type: "postback",
        })),
      },
    };
    this.callSendAPI(senderPsid, { attachment: data });
  }

  setPermistentMenu(senderPsid) {
    const data = {
      psid: senderPsid,
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: this.ListFunctions.map((item) => ({
            ...item,
            type: "postback",
          })),
        },
      ],
    };
    this.post("/custom_user_settings", data);
  }
}

module.exports = {
  Messenger,
  messenger: new Messenger(),
};
