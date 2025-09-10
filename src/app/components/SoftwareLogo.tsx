"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function SoftwareLogo({ path = "/Software.json", scale = 1 }: { path?: string; scale?: number }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    fetch(path)
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch(() => {
        // ignore for now
      });
    return () => {
      mounted = false;
    };
  }, [path]);

  // Keep a centered container; apply CSS scale to reduce visual size.
  if (!data) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <Lottie animationData={data} loop autoplay style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
