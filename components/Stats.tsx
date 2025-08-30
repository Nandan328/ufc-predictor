"use client";

import axios from "axios";
import { useEffect } from "react";
import { FighterData } from "@/app/lib/types";

interface StatsProps {
  redFighter: string;
  blueFighter: string;
  redFighterDetails: FighterData | null;
  blueFighterDetails: FighterData | null;
  setRedFighterDetails: (details: FighterData | null) => void;
  setBlueFighterDetails: (details: FighterData | null) => void;
}

export function Stats({
  redFighter,
  blueFighter,
  redFighterDetails,
  blueFighterDetails,
  setRedFighterDetails,
  setBlueFighterDetails,
}: StatsProps) {
  useEffect(() => {
    if (redFighter) {
      axios.get(`/api/get-fighter-details/${redFighter}`).then((res) => {
        setRedFighterDetails(res.data);
      });
    }
    if (blueFighter) {
      axios.get(`/api/get-fighter-details/${blueFighter}`).then((res) => {
        setBlueFighterDetails(res.data);
      });
    }
  }, [redFighter, blueFighter, setRedFighterDetails, setBlueFighterDetails]);

  const rows: Array<{ key: keyof FighterData; label: string }> = [
    { key: "dob", label: "DOB" },
    { key: "stance", label: "Stance" },
    { key: "height", label: "Height" },
    { key: "reach", label: "Reach" },
    { key: "weight", label: "Weight" },
    { key: "str_acc", label: "Strike Accuracy" },
    { key: "td_avg", label: "Takedowns Avg" },
    { key: "sub_avg", label: "Submission Avg" },
  ];

  const formatRecord = (d?: FighterData | null) => {
    if (!d) return "—";
    const { wins, losses, draws } = d;
    if (wins == null && losses == null && draws == null) return "—";
    return `(${wins ?? 0}, ${losses ?? 0}, ${draws ?? 0})`;
  };

  return (
    <div className="grid grid-cols-3 gap-y-2 text-center md:my-2">
      <div className="col-span-1">
        <h2 className="md:text-2xl font-semibold text-red-500">
          {redFighterDetails?.name || "—"}
        </h2>
        <h4>
          <i className="text-red-300 text-xs">
            &quot;{redFighterDetails?.nick_name || null}&quot;
          </i>
        </h4>
      </div>
      <div className="col-span-1 text-center flex items-center justify-center">
        <span className="text-xl md:text-3xl text-black dark:text-white">vs</span>
      </div>
      <div className="col-span-1">
        <h2 className="md:text-2xl font-semibold text-blue-500">
          {blueFighterDetails?.name || "—"}
        </h2>
        <h4>
          <i className="text-blue-300 text-xs">
            &quot;{blueFighterDetails?.nick_name || null}&quot;
          </i>
        </h4>
      </div>

      <div className="col-span-3 my-1 border-t border-gray-200 dark:border-gray-800" />

      <div className="contents">
        <div className="col-span-1 text-center pr-2">
          <span className="text-red-400">
            {formatRecord(redFighterDetails)}
          </span>
        </div>
        <div className="col-span-1 contents text-black dark:text-white">
          (W, L, D)
        </div>
        <div className="col-span-1 text-center pl-2">
          <span className="text-blue-400">
            {formatRecord(blueFighterDetails)}
          </span>
        </div>
      </div>

      {rows.map(({ key, label }) => (
        <div key={String(key)} className="contents">
          <div className="col-span-1 text-center pr-2">
            <span className="text-red-400">
              {redFighterDetails?.[key]}
            </span>
          </div>
          <div className="col-span-1 contents text-black dark:text-white">
            {label}
          </div>
          <div className="col-span-1 text-center pl-2">
            <span className="text-blue-400">
              {blueFighterDetails?.[key]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
