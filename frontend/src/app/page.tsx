/**
 * This document is for the scanner element
 */

"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import {
  IDetectedBarcode,
  Scanner,
  boundingBox,
} from "@yudiel/react-qr-scanner";
import { Button } from "@/components/ui/button";
import FormQrCode from "@/components/FormQrCode";

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
    <div className="grid grid-cols-12 gap-4 h-full">
      <div className="col-span-12 md:col-span-4 content-center rounded-lg shadow-xl p-3">
        <div>
          <Scanner
            classNames={{ container: "rounded-xl", video: "rounded-xl" }}
            formats={["qr_code", "ean_8", "ean_13"]}
            onScan={handleScan}
            onError={(error) => {
              console.log(`onError: ${error}'`);
            }}
            components={{
              audio: true,
              onOff: false,
              torch: false,
              zoom: true,
              finder: true,
              tracker: boundingBox,
            }}
            allowMultiple={true}
            scanDelay={2000}
            paused={isPaused}
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 rounded-lg shadow-xl justify-items-start p-8">
        <FormQrCode
          formData={{ username: scannedResults[scannedResults.length - 1] }}
        />
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
