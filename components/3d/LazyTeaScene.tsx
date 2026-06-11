"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicTeaScene = dynamic(() => import("@/components/3d/TeaScene"), {
  ssr: false,
  loading: () => null
});

export default function LazyTeaScene({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(timeout);
  }, []);

  if (ready) {
    return <DynamicTeaScene className={className} />;
  }

  return <TeaFallback className={className} />;
}

function TeaFallback({ className }: { className: string }) {
  return (
    <div className={`${className} grid place-items-center overflow-hidden`} aria-hidden="true">
      <div className="relative h-28 w-36 animate-float md:h-44 md:w-56">
        <span className="absolute bottom-2 left-1/2 h-7 w-32 -translate-x-1/2 rounded-[50%] bg-white/72 shadow-float md:h-10 md:w-48" />
        <span className="absolute bottom-8 left-1/2 h-12 w-20 -translate-x-1/2 rounded-b-[28px] rounded-t-[10px] border border-white/55 bg-white/70 md:bottom-12 md:h-20 md:w-32" />
        <span className="absolute bottom-[74px] left-1/2 h-3 w-20 -translate-x-1/2 rounded-[50%] bg-plum/80 md:bottom-[124px] md:w-32" />
        <span className="absolute bottom-[58px] right-6 h-10 w-8 rounded-r-full border-r-4 border-white/70 md:bottom-[92px] md:right-9 md:h-16 md:w-12" />
        <span className="absolute left-[38%] top-1 h-12 w-px rounded-full bg-white/34 md:h-20" />
        <span className="absolute left-1/2 top-2 h-12 w-px rounded-full bg-lilac/55 md:h-20" />
        <span className="absolute right-[35%] top-0 h-12 w-px rounded-full bg-white/34 md:h-20" />
      </div>
    </div>
  );
}
