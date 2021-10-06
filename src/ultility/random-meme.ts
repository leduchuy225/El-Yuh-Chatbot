import axios from "axios";
import { load } from "cheerio";
import { MEME_MAX, MEME_MIN } from "./../const";
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

/* export const getRandomMemeOnMemedroid = async () => {
  let random;
  let data;

  while (!data) {
    random = getRandom(MEME_MIN, MEME_MAX);
    data = await axios
      .get("https://www.memedroid.com/memes/detail/" + random)
      .catch(() => false);
  }

  const $ = load((data as any).data);
  return $("#detailed-item-image-container").attr("src");
}; */
