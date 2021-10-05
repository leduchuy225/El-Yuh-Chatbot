const { default: axios } = require("axios");
const { PAGE_ACCESS_TOKEN, GET_STARTED, Menu } = require("./const.js");
const { crawlLastestNewsFromThanhNienVn } = require("./utility.js");

class Messenger {
  #BASE_URL = "https://graph.facebook.com/v2.6/me";
  #TOKEN = PAGE_ACCESS_TOKEN;
  #ListFunctions = [
    {
      title: "Get newest news",
      payload: Menu.NEWS,
    },
  ];

  #call({ path, ...options }) {
    return axios({
      params: { access_token: this.#TOKEN },
      url: this.#BASE_URL + path,
      ...options,
    }).catch((err) => console.log(err));
  }

  #post(path, data) {
    return this.#call({ method: "post", path, data });
  }

  callSendAPI(senderPsid, response) {
    this.#post("/messages", {
      recipient: { id: senderPsid },
      message: response,
    });
  }

  setGetStartedPayload() {
    this.#post("/messenger_profile", {
      get_started: { payload: GET_STARTED },
    });
  }

  setSelectButton(senderPsid) {
    const data = {
      type: "template",
      payload: {
        template_type: "button",
        text: "How can I help you ?",
        buttons: this.#ListFunctions.map((item) => ({
          ...item,
          type: "postback",
        })),
      },
    };
    this.callSendAPI(senderPsid, { attachment: data });
  }

  async sendNews(senderPsid) {
    const data = await crawlLastestNewsFromThanhNienVn(3);
    if (data && data.length) {
      const listNews = {
        type: "template",
        payload: {
          template_type: "list",
          top_element_style: "compact",
          elements: data.map((item) => ({
            title: item.name,
            subtitle: item.time,
            default_action: {
              type: "web_url",
              url: item.link,
              webview_height_ratio: "tall",
            },
          })),
        },
      };
      this.callSendAPI(senderPsid, {
        attachment: listNews,
      });
    }
  }

  setPermistentMenu(senderPsid) {
    const data = {
      psid: senderPsid,
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: this.#ListFunctions.map((item) => ({
            ...item,
            type: "postback",
          })),
        },
      ],
    };
    this.#post("/custom_user_settings", data);
  }
}

module.exports.messenger = new Messenger();
