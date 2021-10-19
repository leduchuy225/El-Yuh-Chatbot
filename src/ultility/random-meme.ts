import axios from "axios";
import { load } from "cheerio";
import { MEME_MAX, MEME_MIN } from "./../config/const";
import { getRandom } from "./ultility";

export const getRandomMemeOnMemedroid = async () => {
  const random = getRandom(MEME_MIN, MEME_MAX);
  const { data } = await axios.get(
    "https://www.memedroid.com/memes/random/" + random
  );
  const $ = load(data);
  const imageNode = $("img.img-responsive.grey-background");

  return [imageNode[getRandom(0, imageNode.length - 1)].attribs["src"]];
};
