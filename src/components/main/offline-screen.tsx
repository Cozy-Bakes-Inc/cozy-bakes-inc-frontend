"use client";

import { useOnlineStatus } from "@/hooks/use-online-status";
import { WifiOff } from "lucide-react";

export function OfflineScreen() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fbfaf6] px-6">
      <div className="flex -translate-y-6 flex-col items-center text-center">
        <div className="mb-8 flex size-[90px] items-center justify-center rounded-full border border-primary/40 bg-white text-primary shadow-[0_2px_10px_rgba(61,44,30,0.08)]">
          <WifiOff className="size-10" strokeWidth={2.2} />
        </div>
        <h2 className="font-serif text-[30px] font-bold leading-none text-[#211306]">
          You are offline
        </h2>
        <p className="mt-6 font-serif text-lg leading-7 text-[#475f85]">
          Check your network or internet connection.
        </p>
      </div>
    </div>
  );
}
