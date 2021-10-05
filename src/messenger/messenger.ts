import axios, { AxiosRequestConfig } from "axios";
import { GET_STARTED, Menu, PAGE_ACCESS_TOKEN } from "../const";
import { MessageResponse } from "./messenger.type";

interface CallRequestInterface extends AxiosRequestConfig {
  path: string;
}

export class Messenger {
  private BASE_URL = "https://graph.facebook.com/v2.6/me";
  private TOKEN = PAGE_ACCESS_TOKEN;

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

  callSendAPI = (senderPsid: string, response: MessageResponse) => {
    this.post("/messages", {
      recipient: { id: senderPsid },
      message: response,
    });
  };

  setGetStartedPayload = () => {
    this.post("/messenger_profile", {
      get_started: { payload: GET_STARTED },
    });
  };

  setSelectButton = (senderPsid: string) => {
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
  };

  setPermistentMenu = (senderPsid: string) => {
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
  };
}

export const messenger = new Messenger();
