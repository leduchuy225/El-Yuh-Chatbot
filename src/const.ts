import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8080;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
export const GET_STARTED = "1";
export const DATE_FORMAT = "DD/MM/YYYY";

export const MEME_MIN = 1;
export const MEME_MAX = 200;

export const NUMBER_OF_NEWS = 5;

export enum Menu {
  NEWS = "NEWS",
  HOROSCOPE = "HOROSCOPE",
  MEME = "MEME",
}

export enum Horoscope {
  GEMINI = "song-tu-3",
}
