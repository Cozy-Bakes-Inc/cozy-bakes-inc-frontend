"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { CalendarDays, MapPin, Navigation } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { marketSlides } from "@/data";
import SliderDots from "@/components/ui/slider-dots";

export default function MarketSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <div className="shrink-0">
              <Image
                src="/images/break.svg"
                alt="beard"
                height={20}
                width={20}
              />
            </div>
            <span> Weekly Presence</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Freshly Baked, <span className="text-heading-2">Locally Found</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
            We bring the warmth of our oven to local squares across the city.
          </p>
        </div>

        <div className="relative mt-10 rounded-2xl bg-white/90 shadow-lg">
          <Swiper
            className="pb-10"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {marketSlides.map((slide) => (
              <SwiperSlide key={slide.title}>
                <div className="grid items-stretch md:grid-cols-2">
                  <div className="relative h-50 overflow-hidden rounded-t-2xl md:h-120 md:rounded-l-2xl md:rounded-tr-none">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={720}
                      height={520}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex h-full flex-col justify-center rounded-b-2xl border-t-4 border-primary/10 bg-white p-6 sm:p-8 md:rounded-r-2xl md:rounded-bl-none md:border-r-4 md:p-10">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {slide.badge}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-slate-800 sm:text-2xl">
                      {slide.title}
                    </h3>
                    <p className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-primary sm:text-base">
                      {slide.desc}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate-600 sm:text-base">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-primary" />
                        {slide.date} - {slide.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-primary" />
                        {slide.address}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button className="bg-primary hover:bg-primary/90">
                        <Navigation className="size-4" />
                        {slide.primaryCta}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary/30 text-primary"
                      >
                        {slide.secondaryCta}
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderDots
            count={marketSlides.length}
            activeIndex={activeIndex}
            onSelect={(index) => swiperRef.current?.slideTo(index)}
            bottom="-bottom-15"
            inActiveBg="h-2.5 w-2.5 bg-primary/25 hover:bg-primary/40"
          />
        </div>
      </div>
    </section>
  );
}
