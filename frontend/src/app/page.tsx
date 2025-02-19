"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [scannedResults, setScannedResults] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const handleScan = (result: IDetectedBarcode[]) => {
    if (result && !isPaused) {
      console.log("result:", [...result]);
      setScannedResults((prev) => [
        ...prev,
        ...result.map((item) => item.rawValue),
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Scanner
        styles={{
          container: { height: "350px", width: "350px" },
          finderBorder: 3,
        }}
        onScan={handleScan}
        paused={isPaused}
      />
      <Button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? "Resume" : "Pause"} Scanner
      </Button>
      <div className="w-full max-w-md p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Scanned Results:</h2>
        <ul className="list-disc pl-5">
          {scannedResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
