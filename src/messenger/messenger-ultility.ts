import { Horoscope } from "../const";
import {
  crawlHoroscopeTodayFromLichNgayTotVn,
  createDailyHoroScropeForm,
} from "../ultility/horoscope";
import { crawlLastestNewsFromThanhNienVn } from "../ultility/news";
import { getRandomMemeOnMemedroid } from "../ultility/random-meme";
import { ImageTransfer, ListForm } from "./../ultility/ultility";
import { Messenger } from "./messenger";

class MessengerUltility extends Messenger {
  sendNews = async (senderPsid: string) => {
    const data = await crawlLastestNewsFromThanhNienVn();
    if (!data || !data.length) return;

    const listNews = ListForm(
      data.map(({ name, time, link }) => ({
        title: name,
        subtitle: time,
        default_action: {
          url: link,
          type: "web_url",
          webview_height_ratio: "tall",
        },
      }))
    );
    this.callSendAPI(senderPsid, {
      attachment: listNews,
    });
  };

  sendHoroscopeForToday = async (senderPsid: string) => {
    const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
    this.callSendAPI(senderPsid, {
      attachment: ImageTransfer(data.image),
    });
    this.callSendAPI(senderPsid, {
      text: createDailyHoroScropeForm(data),
    });
  };

  sendRandomMeme = async (senderPsid: string) => {
    const image = await getRandomMemeOnMemedroid();
    this.callSendAPI(senderPsid, {
      attachment: ImageTransfer(image[0]),
    });
  };
}

export const messengerUltility = new MessengerUltility();
