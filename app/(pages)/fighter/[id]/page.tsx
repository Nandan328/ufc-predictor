"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import fighters from "@data/data.json";
import { FighterData } from "@/app/lib/types";
import default_image from "@public/default-image.png";

export default function Fighter() {
  const params = useParams();
  const fighterId = params.id;
  const [fighter, setFighter] = useState<FighterData | null>(null);
  useEffect(() => {
    const getFighter = async () => {
      if (!fighterId) return;
      const found = fighters.find((f) => f.id === fighterId);
      setFighter(found ?? null);
    };
    getFighter();
  }, [fighterId]);

  if (!fighter) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xl text-zinc-400 dark:text-zinc-600">
        Fighter not found.
      </div>
    );
  }

  const formatRecord = (f: FighterData) => {
    if (f.wins == null && f.losses == null && f.draws == null) return "—";
    return `(${f.wins ?? 0} W, ${f.losses ?? 0} L, ${f.draws ?? 0} D)`;
  };
  const stat = (val: string | number | null | undefined, suffix = "") =>
    val === null || val === undefined ? "—" : `${val}${suffix}`;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-15 mb:pb-10">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white/70 dark:bg-black/60 rounded-2xl p-4">
        <div className="flex-shrink-0">
          <Image
            src={fighter.img || default_image}
            alt={fighter?.name}
            width={208}
            height={316}
            className="w-[208px] h-[316px] object-cover"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {fighter.name}
          </h1>
          {fighter.nick_name && (
            <div className="text-lg italic text-zinc-500 dark:text-zinc-400 mb-2">
              &quot;{fighter.nick_name}&quot;
            </div>
          )}
          <div className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 mb-2">
            <p className="font-semibold">Record:</p> {formatRecord(fighter)}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {fighter.stance && (
              <p className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium">
                {fighter.stance}
              </p>
            )}
            {fighter.weight && (
              <p className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium">
                {fighter.weight} kgs
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/60 dark:bg-black/50 rounded-xl p-4">
        <Stat label="DOB" value={stat(fighter.dob)} />
        <Stat label="Height" value={stat(fighter.height, " cm")} />
        <Stat label="Reach" value={stat(fighter.reach, " cm")} />
        <Stat label="Strike Acc." value={stat(fighter.str_acc, "%")} />
        <Stat label="Strike Def." value={stat(fighter.str_def, "%")} />
        <Stat label="SLpM" value={stat(fighter.splm)} />
        <Stat label="SApM" value={stat(fighter.sapm)} />
        <Stat label="Takedown Avg" value={stat(fighter.td_avg)} />
        <Stat label="TD Acc." value={stat(fighter.td_avg_acc, "%")} />
        <Stat label="TD Def." value={stat(fighter.td_def, "%")} />
        <Stat label="Sub. Avg" value={stat(fighter.sub_avg)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-zinc-200/60 dark:bg-zinc-800/60 rounded-lg p-2">
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>
      <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}
