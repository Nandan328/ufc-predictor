"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Info } from "@/components/Info";
import { Result } from "@/components/Result";
import { Stats } from "@/components/Stats";
import { useState } from "react";

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

export default function Home() {
  const [redfighter, setRedFighter] = useState("");
  const [bluefighter, setBlueFighter] = useState("");
  const [redFighterDetails, setRedFighterDetails] =
    useState<FighterData | null>(null);
  const [blueFighterDetails, setBlueFighterDetails] =
    useState<FighterData | null>(null);
  const [result, setResult] = useState<string | null>(null);

  return (
    <>
      <Info />
      <div className="min-h-screen bg-black text-white">
        <header className="text-center pt-3 pb-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Who will win the Fight?
          </h1>
          <p className="text-gray-300 text-xs md:text-sm">
            Pick two fighters and see who comes out on top!
          </p>
        </header>

        <div className="flex flex-wrap w-full max-w-7xl mx-auto px-3 justify-center">
          <div className="order-1 w-1/2 md:w-1/3">
            <Card
              setfighter={setRedFighter}
              fighterType="red"
              fighterImage={redFighterDetails?.img}
              setResult={setResult}
              setFighterDetails={setRedFighterDetails}
            />
          </div>

          <div className="order-2 w-1/2 md:w-1/3 md:order-3">
            <Card
              invert={true}
              setfighter={setBlueFighter}
              fighterType="blue"
              fighterImage={blueFighterDetails?.img}
              setResult={setResult}
              setFighterDetails={setBlueFighterDetails}
            /> 
          </div>
            <div className="order-3 md:order-2 md:w-1/3">
            <Stats
              redFighter={redfighter}
              blueFighter={bluefighter}
              redFighterDetails={redFighterDetails}
              blueFighterDetails={blueFighterDetails}
              setRedFighterDetails={setRedFighterDetails}
              setBlueFighterDetails={setBlueFighterDetails}
            />
          
          </div>
        </div>
        <Button
          redFighter={redfighter}
          blueFighter={bluefighter}
          setResult={setResult}
        />
        {result && <Result result={result} />}
      </div>
    </>
  );
}
