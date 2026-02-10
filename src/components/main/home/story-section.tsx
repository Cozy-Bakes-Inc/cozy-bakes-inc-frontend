import { cn } from "@/lib";
import Image from "next/image";

interface Story {
  bg?: string;
  circle?: boolean;
}
export default function StorySection({ bg, circle = true }: Story) {
  return (
    <section className={cn("relative overflow-hidden bg-bg-creamy py-20", bg)}>
      {circle && (
        <>
          <div className="pointer-events-none absolute -left-20 top-16 hidden size-56 rounded-full border border-primary/10 sm:block" />
          <div className="pointer-events-none absolute -right-16 bottom-12 hidden size-64 rounded-full border border-primary/15 sm:block" />
        </>
      )}

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <div className="shrink-0">
              <Image
                src="/images/story.svg"
                alt="beard"
                height={20}
                width={20}
              />
            </div>
            <span> Our Story</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            A Journey of,{" "}
            <span className="text-heading-2">Passion & Craft</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Every great bakery has a story, and ours is built on love,
            dedication, and timeless techniques.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-in fade-in slide-in-from-left-6 duration-700">
            <h3 className="bg-linear-to-r from-primary to-secondary bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
              Where Handcrafted Excellence Lives in Every Bite
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray sm:text-base">
              Every great bakery has a story. Ours is built on love, dedication,
              and timeless craft. Step inside Cozy Bakes and experience the
              warmth, flavor, and craftsmanship behind every creation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray sm:text-base">
              Every morning, we wake before dawn to knead dough, shape
              croissants, and bake bread using the same techniques passed down
              through generations. We believe in the power of real food—made
              from scratch, with ingredients you can pronounce, and baked with
              love.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray sm:text-base">
              Today, we are proud to serve our community with the same
              dedication to quality, warmth, and authenticity that inspired us
              from day one. Every loaf tells a story, and every bite is a
              celebration of tradition.
            </p>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-chocolate">
                Our Philosophy
              </p>
              <p className="mt-2 text-sm text-Taupe-Brown">
                We do not take shortcuts. We do not use preservatives. We simply
                bake the way bread was meant to be made—with time, patience, and
                the finest ingredients.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-right-6 duration-700 delay-150">
            <figure className="group relative overflow-hidden rounded-3xl shadow-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story-1.png"
                  alt="Bakery market stand with artisan breads"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
            <figure className="group relative overflow-hidden rounded-3xl shadow-lg sm:translate-y-5">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story-2.png"
                  alt="Fresh pastries and cakes on wooden trays"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
            <figure className="group relative overflow-hidden rounded-3xl shadow-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story-3.png"
                  alt="Cinnamon rolls fresh from the oven"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
            <figure className="group relative overflow-hidden rounded-3xl shadow-lg sm:translate-y-5">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story-4.png"
                  alt="Rustic loaves by a warm oven"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
