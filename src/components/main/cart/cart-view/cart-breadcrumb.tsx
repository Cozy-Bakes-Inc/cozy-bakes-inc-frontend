import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CartBreadcrumb() {
  return (
    <section className="bg-chocolate">
      <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-white sm:px-10 sm:text-sm">
        <nav className="inline-flex items-center justify-center gap-1 text-xs sm:text-sm">
          <Link href="/" className="text-gray-300 transition hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-4 text-gray-400" />
          <span className="font-medium text-primary">cart</span>
        </nav>
      </div>
    </section>
  );
}
