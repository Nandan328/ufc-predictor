"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Info } from "@/components/Info";
import { Result } from "@/components/Result";
import { Stats } from "@/components/Stats";
import { Suspense, useEffect, useState } from "react";
import { FighterData } from "../../lib/types";
import { useSearchParams } from "next/navigation";

export default function PredictWinner() {
 return <>
  <Suspense>
    <WinnerPrediction />
  </Suspense>
 </>
}

function WinnerPrediction() {
   const searchParams = useSearchParams();
   const r_name = searchParams.get("r_name") || null;
   const b_name = searchParams.get("b_name") || null;

   const [redfighter, setRedFighter] = useState("");
   const [bluefighter, setBlueFighter] = useState("");
   const [redFighterDetails, setRedFighterDetails] =
     useState<FighterData | null>(null);
   const [blueFighterDetails, setBlueFighterDetails] =
     useState<FighterData | null>(null);
   const [result, setResult] = useState<string | null>(null);
   const [find, setFind] = useState(false);

   
   useEffect(() => {
     if (r_name) {
       setRedFighter(r_name);
      }
      if (b_name) {
        setBlueFighter(b_name);
      }
    }, [r_name, b_name]);
    
    useEffect(() => {
      setFind(
        r_name != null && redfighter != "" && b_name != null && bluefighter != ""
      );
    }, [r_name, b_name, redfighter, bluefighter]);
    
   return (
     <>
       <Info />
       <div className="max-h-screen dark:bg-black dark:text-white pb-15">
         <header className="text-center p-2">
           <h1 className="text-2xl md:text-4xl font-bold md:mb-2 bg-gradient-to-r from-red-700 to-blue-700 bg-clip-text text-transparent">
             Who will win the Fight?
           </h1>
         </header>

         <div className="grid grid-cols-10 w-full mx-auto px-3 md:mt-7">
           <div className="col-span-5 md:col-span-3">
             <Card
               setfighter={setRedFighter}
               fighterType="red"
               fighterImage={redFighterDetails?.img}
               setResult={setResult}
               setFighterDetails={setRedFighterDetails}
             />
           </div>

           <div className="col-span-5 md:col-span-3 md:order-3">
             <Card
               invert={true}
               setfighter={setBlueFighter}
               fighterType="blue"
               fighterImage={blueFighterDetails?.img}
               setResult={setResult}
               setFighterDetails={setBlueFighterDetails}
             />
           </div>
           <div className="col-span-10 md:col-span-4">
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
           find={find}
           setFind={setFind}
         />
         {result && <Result result={result} redFighter={redfighter} />}
       </div>
     </>
   );
}