import Link from "next/link";

export default function ProductBreadcrumb() {
  return (
    <section className="bg-chocolate">
      <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-white sm:px-10 sm:text-sm">
        <Link href={"/categories"}>All Categories</Link>
        <span className="mx-2">›</span>
        <Link href={"/categories/1"}>Breads</Link>
        <span className="mx-2">›</span>
        <Link href={"/products/1"} className="text-primary">
          Sourdough Bread
        </Link>
      </div>
    </section>
  );
}
