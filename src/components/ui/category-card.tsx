import Image from "next/image";
import type { CategoryItem } from "@/interfaces";
import Link from "next/link";

type CategoryCardProps = {
  item: CategoryItem;
};

export default function CategoryCard({ item }: CategoryCardProps) {
  return (
    <Link href={`/categories/1`}>
      <article className="group relative h-full overflow-hidden rounded-4xl bg-white shadow-sm">
        <div className="relative h-80">
          <Image
            src={item.image}
            alt={item.title}
            width={520}
            height={360}
            className="h-full w-full object-cover transition-all duration-300 delay-0 group-hover:opacity-0 group-hover:delay-150"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent transition-all duration-300 delay-0 group-hover:opacity-0 group-hover:delay-150" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white transition-opacity duration-300 delay-0 group-hover:opacity-0 group-hover:delay-150">
          <span className="mb-2 h-1 w-10 rounded-full bg-primary" />
          <h3 className="text-base font-semibold sm:text-lg">{item.title}</h3>
          <p className="mt-1 text-xs text-white/80">{item.subtitle}</p>
        </div>

        <div className="absolute inset-0 z-999 translate-y-full bg-bg-creamy p-6 text-dark opacity-0 shadow-sm transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {/* <div className="absolute left-5 top-6 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-primary/40" /> */}
          <div className="absolute right-5 top-6 h-8 w-8 rounded-tr-lg border-r-2 border-t-2 border-primary/40" />
          <div className="absolute left-5 bottom-6 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-primary/40" />
          {/* <div className="absolute right-5 bottom-6 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-primary/40" /> */}
          <div className="flex items-center gap-2">
            <div className=" h-1 w-10 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Discover
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-dark">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray">{item.desc}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary absolute right-5 bottom-6">
            Explore Collection
            <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
