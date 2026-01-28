"use client";

import { Button } from "@/components/ui/button";
type HeroSliderDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function HeroSliderDots({
  count,
  activeIndex,
  onSelect,
}: HeroSliderDotsProps) {
  return (
    <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
      <div className="flex items-center gap-2 px-3 py-2">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <Button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => onSelect(i)}
              variant="ghost"
              size="icon"
              className={[
                "transition-all duration-300 ease-out",
                "rounded-full p-0",
                isActive
                  ? "h-2.5 w-10 bg-primary shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                  : "h-2.5 w-2.5 bg-white/35 hover:bg-white/55",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
