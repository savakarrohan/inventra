"use client";
export const dynamic = "force-dynamic";

import { Scanner } from "@yudiel/react-qr-scanner";

export default function Home() {
  return (
    <div className="">
      <Scanner
        styles={{
          container: { height: "350px", width: "350px" },
          finderBorder: 3,
        }}
        onScan={(result) => console.log(result)}
      />
    </div>
  );
}
