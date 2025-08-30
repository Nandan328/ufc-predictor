interface resultProps {
  result: string | null;
  redFighter: string;
}

export function Result({ result, redFighter }: resultProps) {
  return (
    <div className="mt-2 md:mt-4">
      {result && result != "Predicting..." ? (
        <>
          {redFighter == result ? (
            <p className="text-center text-red-500 text-xl font-bold">{result}</p>
          ) : (
            <p className="text-center text-blue-500 text-xl font-bold">{result}</p>
          )}
        </>
      ) : (
        <p className="text-center font-bold">{result ? result : "No prediction available."}</p>
      )}
    </div>
  );
}
