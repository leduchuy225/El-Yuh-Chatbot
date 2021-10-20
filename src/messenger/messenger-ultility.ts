import { Horoscope } from "../config/const";
import {
  crawlHoroscopeTodayFromLichNgayTotVn,
  createDailyHoroScropeForm,
} from "../ultility/horoscope";
import { crawlLastestNewsFromThanhNienVn } from "../ultility/news";
import { getRandomMemeOnMemedroid } from "../ultility/random-meme";
import { MessengerService } from "../service/messenger.service";

class MessengerUltility extends MessengerService {
  sendNews = async (senderPsid: string) => {
    const data = await crawlLastestNewsFromThanhNienVn();
    if (!data || !data.length) return;

    const listNews = data.map((item) => ({
      title: item.name,
      subtitle: item.time,
      default_action: {
        url: item.link,
        type: "web_url",
        webview_height_ratio: "tall",
      },
    }));

    this.sendList(senderPsid, { elements: listNews });
  };

  sendHoroscopeForToday = async (senderPsid: string) => {
    const data = await crawlHoroscopeTodayFromLichNgayTotVn(Horoscope.GEMINI);
    this.sendImage(senderPsid, data.image);
    this.callSendAPI(senderPsid, {
      text: createDailyHoroScropeForm(data),
    });
  };

  sendRandomMeme = async (senderPsid: string) => {
    const image = await getRandomMemeOnMemedroid();
    this.sendImage(senderPsid, image[0]);
  };
}

export const messengerUltility = new MessengerUltility();
