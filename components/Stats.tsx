import axios from "axios";
import { useEffect, useState } from "react";

interface FighterStat {
  stat: string;
  num: string;
}

interface FighterData {
  name: string;
  nickname: string;
  division: string;
  tags: string[];
  win_lose: string;
  stats: FighterStat[];
  img?: string;
}

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

  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if(redFighter) {
      axios.get(`api/get-fighter-details/${redFighter}`).then((response) => {
        setRedFighterDetails(response.data);
      }).catch((error) => {
        console.error("Error fetching red fighter details:", error);
        setRedFighterDetails(null);
      });
    }
    if(blueFighter) {
      axios.get(`api/get-fighter-details/${blueFighter}`).then((response) => {
        setBlueFighterDetails(response.data);
      }).catch((error) => {
        console.error("Error fetching blue fighter details:", error);
        setBlueFighterDetails(null);
      });
    }
  }, [redFighter, blueFighter, setRedFighterDetails, setBlueFighterDetails]);

  useEffect(() => {
    setSelected(!!(redFighterDetails || blueFighterDetails));
  }, [redFighterDetails, blueFighterDetails]);

  return (
    <div className="bg-black m-2">
      <div className="p-3">
        <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          VS
        </h2>

        {selected ? (
          <div className="space-y-4">
            {/* Fighter Names */}
            <div className="grid grid-cols-3 gap-3 mb-2">
              <div className="text-right">
                <h3 className="text-lg text-center font-semibold text-red-500">
                  {redFighterDetails?.name}
                </h3>
                <p className="text-xs text-center text-red-300 italic">
                  {redFighterDetails?.nickname ? ('"' + redFighterDetails.nickname + '"') : null}
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-md font-semibold text-white border-b border-gray-600 pb-2">
                  FIGHTERS
                </h4>
              </div>
              <div className="text-left">
                <h3 className="text-lg text-center font-semibold text-blue-500">
                  {blueFighterDetails?.name}
                </h3>
                <p className="text-xs text-center text-blue-300 italic">
                  {blueFighterDetails?.nickname ? ('"' + blueFighterDetails.nickname + '"') : null}
                </p>
              </div>
            </div>
            {/* Basic Info */}
            <div className="space-y-1">
              <h4 className="text-md font-semibold text-center text-white mb-2 border-b border-gray-600 pb-1">
                BASIC INFO
              </h4>
              <StatRow
                label="Division"
                redValue={redFighterDetails?.division}
                blueValue={blueFighterDetails?.division}
              />
              <StatRow
                label="Record"
                redValue={redFighterDetails?.win_lose}
                blueValue={blueFighterDetails?.win_lose}
              />
            </div>

            {redFighterDetails && blueFighterDetails && redFighterDetails.stats.length > 0 &&
              blueFighterDetails.stats.length > 0 ? (
                <div className="space-y-1">
                  <h4 className="text-md font-semibold text-center text-white mb-2 border-b border-gray-600 pb-1">
                    PERFORMANCE STATS
                  </h4>
                  {redFighterDetails.stats.map((stat, index) => {
                    const blueStat = blueFighterDetails.stats.find(
                      (s) => s.stat === stat.stat
                    );
                    return blueStat ? (
                      <StatRow
                        key={index}
                        label={stat.stat}
                        redValue={stat.num}
                        blueValue={blueStat.num}
                      />
                    ) : null;
                  })}
                </div>
              ) : null}
          </div>
        ) : (<>
        </>
        )}
      </div>
    </div>
  );
}


const StatRow = ({
  label,
  redValue,
  blueValue,
}: {
  label: string;
  redValue?: string | number;
  blueValue?: string | number;
}) => (
  <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-700">
    <div className="text-right text-red-500 font-semibold text-sm">{redValue}</div>
    <div className="text-center text-white font-semibold text-sm">{label}</div>
    <div className="text-left text-blue-500 font-semibold text-sm">{blueValue}</div>
  </div>
);