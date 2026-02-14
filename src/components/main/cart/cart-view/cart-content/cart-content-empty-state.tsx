import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartContentEmptyState() {
  return (
    <div className="lg:col-span-2 grid min-h-48 place-items-center rounded-xl border border-dashed border-primary/35 bg-bg-creamy text-center">
      <div>
        <ShoppingCart className="mx-auto size-6 text-primary" />
        <p className="mt-2 text-sm font-medium text-dark">
          Your cart is empty.
        </p>
        <p className="text-xs text-gray">
          Add something delicious to continue.
        </p>
        <Link
          href="/categories"
          className="mt-4 inline-flex h-13.5 items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 text-sm font-medium text-white shadow-xs transition hover:bg-primary/90 sm:text-base"
        >
          Explore More Categories
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}
