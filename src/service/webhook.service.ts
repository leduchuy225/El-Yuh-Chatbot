import { DOMAIN_NAME, GET_STARTED, Menu } from "../config/const";
import { messenger } from "./messenger.service";
import { messengerUltility } from "../messenger/messenger-ultility";

export class WebHookService {
  handlePayload = (payload: string, senderPsid: string) => {
    switch (payload) {
      case GET_STARTED:
        messenger.setPersistentMenu(senderPsid);
        messenger.sendSelectButton(senderPsid);
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
      case Menu.USER_SETTING:
        this.openUserSetting(senderPsid);
        return;
    }
  };

  openUserSetting = (senderPsid: string) => {
    const data = [
      {
        type: "web_url",
        url: DOMAIN_NAME + "/webview/user",
        title: "Test web-view",
        webview_height_ratio: "compact",
        messenger_extensions: true,
      },
    ];

    messenger.sendButtonList(senderPsid, {
      text: "For testing purpose",
      buttons: data,
    });
  };
}
