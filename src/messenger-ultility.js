const { Messenger } = require("./message");
const { crawlLastestNewsFromThanhNienVn } = require("./ultility/news");
const {
  crawlHoroscopeTodayFromLichNgayTotVn,
  createDailyHoroScropeForm,
} = require("./ultility/horoscope");
const { Horoscope } = require("./const");

class MessengerUltility extends Messenger {
  sendNews = async (senderPsid) => {
    const data = await crawlLastestNewsFromThanhNienVn(3);
    if (data && data.length) {
      const listNews = {
        type: "template",
        payload: {
          template_type: "list",
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
  };

  sendHoroscopeForToday = async (senderPsid) => {
    const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
    const images = {
      type: "image",
      payload: {
        url: data.image,
        is_reusable: true,
      },
    };
    await this.callSendAPI(senderPsid, {
      attachment: images,
    });
    await this.callSendAPI(senderPsid, {
      text: createDailyHoroScropeForm(data),
    });
  };
}

module.exports.messengerUltility = new MessengerUltility();
