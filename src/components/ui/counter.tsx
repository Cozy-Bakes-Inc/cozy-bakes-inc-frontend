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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        className="grid size-7 place-items-center rounded-md border border-secondary/20 text-secondary transition hover:bg-card/30"
        onClick={handleDecrease}
        aria-label="Decrease quantity"
        disabled={safeValue <= safeMin}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-6 text-center text-sm font-semibold text-secondary">
        {safeValue}
      </span>
      <button
        type="button"
        className="grid size-7 place-items-center rounded-md border border-secondary/20 bg-card/10 text-secondary transition hover:bg-card hover:text-white"
        onClick={handleIncrease}
        aria-label="Increase quantity"
        disabled={safeValue >= safeMax}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
