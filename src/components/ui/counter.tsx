import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export default function Counter({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: CounterProps) {
  const safeMin = Math.max(0, min);
  const safeMax = Math.max(safeMin, max);
  const safeValue = Math.min(
    safeMax,
    Math.max(safeMin, Number.isFinite(value) ? value : safeMin),
  );

  const handleDecrease = () => onChange(Math.max(safeMin, safeValue - 1));
  const handleIncrease = () => onChange(Math.min(safeMax, safeValue + 1));

  const isAtMin = safeValue <= safeMin;
  const isAtMax = safeValue >= safeMax;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        className={cn(
          "grid size-7 place-items-center rounded-md border transition",
          isAtMin
            ? "cursor-not-allowed border-secondary/10 text-secondary/30"
            : "border-secondary/20 text-secondary hover:bg-card/30",
        )}
        onClick={handleDecrease}
        aria-label="Decrease quantity"
        disabled={isAtMin}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-6 text-center text-sm font-semibold text-secondary">
        {safeValue}
      </span>
      <button
        type="button"
        className={cn(
          "grid size-7 place-items-center rounded-md border transition",
          isAtMax
            ? "cursor-not-allowed border-secondary/10 bg-secondary/5 text-secondary/30"
            : "border-secondary/20 bg-card/10 text-secondary hover:bg-card hover:text-white",
        )}
        onClick={handleIncrease}
        aria-label="Increase quantity"
        disabled={isAtMax}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
