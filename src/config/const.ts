import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8080;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export const GET_STARTED = "1";
export const DATE_FORMAT = "DD/MM/YYYY";

export const DOMAIN_NAME = "https://el-yuh-chatbot.herokuapp.com";

export const MEME_MIN = 1;
export const MEME_MAX = 200;

export const NUMBER_OF_NEWS = 5;

export enum Menu {
  NEWS = "NEWS",
  HOROSCOPE = "HOROSCOPE",
  MEME = "MEME",
  USER_SETTING = "USER_SETTING",
}

export enum Horoscope {
  GEMINI = "song-tu-3",
  /* "Bạch Dương" = "bach-duong-1",
  "Kim Ngưu" = "kim-nguu-2",
  "Song Tử" = "song-tu-3",
  "Cự Giải" = "cu-giai-4",
  "Sư Tử" = "su-tu-5",
  "Xử Nữ" = "xu-nu-6",
  "Thiên Bình" = "thien-binh-7",
  "Hổ Cáp" = "ho-cap-8",
  "Nhân Mã" = "nhan-ma-9",
  "Ma Kết" = "ma-ket-10",
  "Bảo Bình" = "bao-binh-11",
  "Song Ngư" = "song-ngu-12", */
}

export enum Stage {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}
