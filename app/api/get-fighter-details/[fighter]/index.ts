import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import axios from "axios";

interface FighterStat {
  stat: string;
  num: string;
}

interface FighterData {
  name: string;
  nickname: string;
  tags: string[];
  division: string;
  win_lose: string;
  stats: FighterStat[];
  img: string | undefined;
}

const FightersData: FighterData[] = [];
const url = "https://www.ufc.com/athlete/";
const axiosInstance = axios.create({
  baseURL: url,
});
async function main(fName: string) {
  const fighterName = fName.split(" ").join("-").toLowerCase();
  const { data } = await axiosInstance.get("/" + fighterName);

  const $ = cheerio.load(data);

  const fighterData: FighterData = {
    name: $("div.hero-profile")
      .find("div.hero-profile__info")
      .find("h1.hero-profile__name")
      .text(),
    nickname: $("div.hero-profile")
      .find("div.hero-profile__info")
      .find("p.hero-profile__nickname")
      .text()
      .replace(/"/g, ""),
    tags: $("div.hero-profile")
      .find("div.hero-profile__info")
      .find("div.hero-profile__tags > p.hero-profile__tag")
      .map((idx: number, el: Element) =>
        $(el)
          .text()
          .replace(/\s/g, " ")
          .split(" ")
          .filter((e: string) => e != "")
          .join(" ")
          .trim()
      )
      .get(),
    division: $("div.hero-profile")
      .find("div.hero-profile__info")
      .find("div.hero-profile__division")
      .find("p.hero-profile__division-title")
      .text(),
    win_lose: $("div.hero-profile")
      .find("div.hero-profile__info")
      .find("div.hero-profile__division")
      .find("p.hero-profile__division-body")
      .text(),
    stats: $("div.hero-profile")
      .find("div.hero-profile__info")
      .find("div.hero-profile__stats > div.hero-profile__stat")
      .map((idx, el: Element) => {
        return {
          stat: $(el).find(".hero-profile__stat-text").text().trim(),
          num: $(el).find(".hero-profile__stat-numb").text().trim(),
        };
      })
      .get(),
    img: $("div.hero-profile")
      .find("div.hero-profile__image-wrap")
      .find("img")
      .attr("src"),
  };
  FightersData.unshift(fighterData);
}

export default async function findFighterDetails (a:string) {
    await main(a);
  return FightersData[0];
};
