export function Result({ result }: { result: string | null }) {
  return (
    <div className="mt-4">
      {result ? (
        <p className="text-center text-lg font-semibold">{result}</p>
      ) : (
        <p className="text-center text-gray-500">No prediction available.</p>
      )}
    </div>
  );
}
