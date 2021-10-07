interface ButtonTemplate {
  title: string;
  payload: string;
  type: string;
  url?: string;
  webview_height_ratio?: string;
  messenger_extensions?: boolean;
}

interface ButtonFormTemplate {
  text: string;
  buttons: ButtonTemplate[];
}

export const removeSpecialCharacters = (text: string) => {
  return text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").trim();
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const ImageTransfer = (image?: string) => {
  return {
    type: "image",
    payload: { url: image, is_reusable: true },
  };
};

export const ListForm = (elements: object[]) => {
  return {
    type: "template",
    payload: {
      template_type: "list",
      elements: elements,
    },
  };
};

export const ButtonFrom = ({ text, buttons }: ButtonFormTemplate) => {
  return {
    type: "template",
    payload: {
      template_type: "button",
      text: text,
      buttons: buttons,
    },
  };
};
