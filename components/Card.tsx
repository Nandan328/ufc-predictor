import fighters from "@data/fighter_names.json";
import { Avatar } from "./Avatar";
import { useEffect, useState } from "react";
import { SuggestionMenu } from "./SuggestionMenu";

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
  img?: string;
}

interface CardProps {
  invert?: boolean;
  setfighter: (fighter: string) => void;
  fighterType: "red" | "blue";
  fighterImage?: string;
  setResult: (result: string | null) => void;
  setFighterDetails: (details: FighterData | null) => void;
}

export function Card({ invert = false, setfighter, fighterType, fighterImage, setResult, setFighterDetails }: CardProps) {

  const [fighterName, setFighterName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    setSuggestions([]);
    fighters.forEach((fighter) => {
      if(fighter.toLowerCase().includes(fighterName.toLowerCase()) && fighterName.length > 0) {
        setSuggestions((prev) => [...prev, fighter]);
      }
    });
  }, [fighterName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFighterDetails(null);
    setFighterName(e.target.value);
    setClicked(true);
    setResult(null);
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-6 bg-black  m-2`}
    >
      <Avatar invert={invert} fighterType={fighterType} fighterImage={fighterImage} />

      <div className="mt-2 w-full max-w-xs flex flex-col items-center">
        <input type="text" onChange={(e) => handleChange(e)} value={fighterName} className="border w-50 md:text-xl text-center focus:outline-none"/>
        { (fighterName && clicked) && (
          <SuggestionMenu suggestions={suggestions} setFighterName={setFighterName} setFighter={setfighter} setClicked={setClicked} />
        )}
      </div>
    </div>
  );
}
