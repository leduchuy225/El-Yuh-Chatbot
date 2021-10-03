const { default: axios } = require("axios");
const { PAGE_ACCESS_TOKEN } = require("./const.js");

class Messenger {
  #BASE_URL = "https://graph.facebook.com/v2.6/me";

  #call({ path, ...config }) {
    return axios({
      params: {
        access_token: PAGE_ACCESS_TOKEN,
      },
      url: this.#BASE_URL + path,
      ...config,
    }).catch((err) => console.log(err));
  }

  #post(path, data) {
    return this.#call({
      method: "post",
      path,
      data,
    });
  }

  async callSendAPI(senderPsid, response) {
    const data = {
      recipient: {
        id: senderPsid,
      },
      message: response,
    };

    await this.#post("/messages", data).then(() =>
      console.log("Send message successfully")
    );
  }
}

module.exports.messenger = new Messenger();
