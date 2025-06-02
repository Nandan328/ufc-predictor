import axios from "axios";

interface ButtonProps {
  redFighter: string;
  blueFighter: string;
  setResult: (result: string | null) => void;
}

export function Button({ redFighter, blueFighter, setResult }: ButtonProps) {

  const getPrediction = async () => {
    if (!redFighter || !blueFighter) {
      setResult("Please select both fighters.");
      return;
    }

    try {
      axios
        .post("/api/get-prediction", {
          red_fighter: redFighter,
          blue_fighter: blueFighter,
        })
        .then((res) => {
          console.log("Prediction response:", res.data);
          if (res.data.predicted_winner) {
            setResult(res.data.predicted_winner);
          } else {
            setResult("No prediction available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching prediction:", error);
          setResult("Error fetching prediction.");
        });
    }catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("Error fetching prediction.");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => getPrediction()} className="cursor-pointer border px-2 py-1 rounded-2xl ">Who will win</button>
    </div>
  );
}