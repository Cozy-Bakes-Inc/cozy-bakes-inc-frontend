import Image from "next/image";

export default function CategoryHeroSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/images/questions.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/65 to-black/45" />

      <div className="relative grid min-h-90 items-center gap-8 px-5 py-20 sm:px-10 lg:min-h-107.5 lg:grid-cols-2">
        <div className="max-w-xl text-white xl:mx-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Explore Our
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Breads
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
            Artisan sourdough, rustic baguettes, and handcrafted loaves baked
            fresh daily with premium organic flour.
          </p>
        </div>

        <div className="hidden justify-self-end lg:block">
          <div>
            <Image
              src="/images/bread-category.png"
              alt="Fresh bakery products"
              height={200}
              width={400}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
