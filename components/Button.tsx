import axios from "axios";
import { useEffect } from "react";

interface ButtonProps {
  redFighter: string;
  blueFighter: string;
  setResult: (result: string | null) => void;
  find: boolean;
  setFind: (find: boolean) => void;
}

export function Button({ redFighter, blueFighter, setResult, find, setFind }: ButtonProps) {
  const getPrediction = async () => {
    setFind(false);
    if (!redFighter || !blueFighter) {
      setResult("Please select both fighters.");
      return;
    }

    try {
      setResult("Predicting...");
      axios
        .post("/api/get-prediction", {
          red_fighter: redFighter,
          blue_fighter: blueFighter,
        })
        .then((res) => {
          console.log("Prediction response:", res.data);
          if (res.data.pred_winner_name) {
            setResult(res.data.pred_winner_name);
          } else {
            setResult("No prediction available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching prediction:", error);
          setResult("Prediction not available.");
        });
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("Prediction not available.");
    }
  };
  useEffect(() => {
    if (find) {
      const callPrediction = () => {
        getPrediction();
      };
      callPrediction();
    }
  }, [find, getPrediction]);
  
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => getPrediction()}
        className="px-4 py-2 border cursor-pointer dark:border-white rounded-full dark:bg-black dark:text-white hover:bg-black hover:text-white  dark:hover:bg-white dark:hover:text-black transition-colors duration-200 font-medium"
      >
        Who will win
      </button>
    </div>
  );
}
