export interface ButtonTemplate {
  title: string;
  payload?: string;
  type: string;
  url?: string;
  webview_height_ratio?: string;
  messenger_extensions?: boolean;
}

export interface ElementTemplate {
  title: string;
  subtitle: string;
  default_action: ActionTemplate;
}

export interface ActionTemplate {
  url: string;
  type: string;
  webview_height_ratio: string;
}

export interface ButtonFormTemplate {
  text: string;
  buttons: ButtonTemplate[];
}

export interface ListFormTemplate {
  elements: ElementTemplate[];
}

export interface QuickReliesTemplate {
  text: string;
  replies: [
    {
      title: string;
      payload: string;
    }
  ];
}

export const removeSpecialCharacters = (text: string) => {
  return text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").trim();
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
