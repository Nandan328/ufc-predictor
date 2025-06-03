import fighters from "@data/fighter_names.json";
import { Avatar } from "./Avatar";

interface CardProps {
  invert?: boolean;
  setfighter: (fighter: string) => void;
  fighterType: "red" | "blue";
  fighterImage?: string;
  setResult: (result: string | null) => void;
}

export function Card({ invert = false, setfighter, fighterType, fighterImage, setResult }: CardProps) {

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-6 bg-black  m-2`}
    >
      <Avatar invert={invert} fighterType={fighterType} fighterImage={fighterImage} />

      <div className="mt-2 w-full max-w-xs">
        <select
          name="fighters"
          id="fighters"
          className={`w-full p-3 bg-black border border-gray-600 scrollbar-hide`}
          onChange={(e) => {
            setfighter(e.target.value);
            setResult(null);
          }}
        >
          <option value="" className="text-gray-400 bg-black">
            Choose a Fighter
          </option>
          {fighters.map((fighter, i) => {
            let fighterName = fighter;
            fighterName = fighterName.split(" ").map((e) => {
              return e.charAt(0).toUpperCase() + e.slice(1);
            }).join(" ");
            return (
              <option key={i} value={fighterName} className="text-white bg-black">
                {fighterName}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
