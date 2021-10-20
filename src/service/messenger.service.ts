import { ListFormTemplate } from "./../ultility/ultility";
import axios, { AxiosRequestConfig } from "axios";
import { GET_STARTED, Menu, PAGE_ACCESS_TOKEN } from "../config/const";
import { ButtonFormTemplate, QuickReliesTemplate } from "../ultility/ultility";

type MessageResponse = { text: string } | { attachment: any } | object;

interface CallRequestInterface extends AxiosRequestConfig {
  path: string;
}

interface MenuTemplate {
  title: string;
  payload: string;
}

export class MessengerService {
  private BASE_URL = "https://graph.facebook.com/v2.6/me";
  private TOKEN = PAGE_ACCESS_TOKEN;

  ButtonFunctions: MenuTemplate[] = [
    {
      title: "Get Newest News",
      payload: Menu.NEWS,
    },
    {
      title: "Daily Horoscrope",
      payload: Menu.HOROSCOPE,
    },
    {
      title: "Random Meme",
      payload: Menu.MEME,
    },
  ];

  MenuFunctions: MenuTemplate[] = [
    {
      title: "User settings",
      payload: Menu.USER_SETTING,
    },
  ];

  private call = ({ path, ...options }: CallRequestInterface) => {
    return axios({
      params: { access_token: this.TOKEN },
      url: this.BASE_URL + path,
      ...options,
    }).catch((err) => console.log(err));
  };

  private post = (path: string, data: object) => {
    return this.call({ method: "post", path, data });
  };

  callSendAPI = (
    senderPsid: string,
    response: MessageResponse,
    options?: {
      messagingType: string;
    }
  ) => {
    this.post("/messages", {
      recipient: { id: senderPsid },
      messagingType: options?.messagingType,
      message: response,
    });
  };

  setGetStartedPayload = () => {
    this.post("/messenger_profile", {
      get_started: { payload: GET_STARTED },
    });
  };

  sendQuickReplies = (senderPsid: string, response: QuickReliesTemplate) => {
    const { text, replies } = response;
    const data = {
      text: text,
      quick_replies: replies.map((item) => ({
        content_type: "text",
        title: item.title,
        payload: item.payload,
      })),
    };
    this.callSendAPI(senderPsid, data, { messagingType: "RESPONSE" });
  };

  sendButtonList = (senderPsid: string, response: ButtonFormTemplate) => {
    const { text, buttons } = response;
    const data = {
      type: "template",
      payload: {
        template_type: "button",
        text: text,
        buttons: buttons,
      },
    };
    this.callSendAPI(senderPsid, { attachment: data });
  };

  sendList = (senderPsid: string, response: ListFormTemplate) => {
    const { elements } = response;
    const data = {
      type: "template",
      payload: {
        template_type: "list",
        elements: elements,
      },
    };
    this.callSendAPI(senderPsid, { attachment: data });
  };

  sendSelectButton = (senderPsid: string) => {
    const options = this.ButtonFunctions.map((item) => ({
      ...item,
      type: "postback",
    }));
    const data = {
      text: "How can I help you ?",
      buttons: options,
    };
    this.sendButtonList(senderPsid, data);
  };

  sendImage = (senderPsid: string, image?: string) => {
    const data = {
      type: "image",
      payload: { url: image, is_reusable: true },
    };
    this.callSendAPI(senderPsid, { attachment: data });
  };

  setPersistentMenu = (senderPsid: string) => {
    const options = [...this.ButtonFunctions, ...this.MenuFunctions].map(
      (item) => ({
        ...item,
        type: "postback",
      })
    );
    const data = {
      psid: senderPsid,
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: options,
        },
      ],
    };
    this.post("/custom_user_settings", data);
  };
}

export const messenger = new MessengerService();
