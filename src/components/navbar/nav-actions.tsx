import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, UserRound } from "lucide-react";

export default function NavActions() {
  return (
    <div className="hidden sm:flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="group border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
      >
        <Search className="size-5 shrink-0" strokeWidth={2.8} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="group border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
      >
        <ShoppingCart
          className="size-5 shrink-0 fill-primary stroke-primary group-hover:fill-secondary group-hover:stroke-secondary"
          strokeWidth={2.8}
        />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="group border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
      >
        <UserRound
          className="size-5 shrink-0 fill-primary stroke-primary group-hover:fill-secondary group-hover:stroke-secondary"
          strokeWidth={2.8}
        />
      </Button>
    </div>
  );
}
