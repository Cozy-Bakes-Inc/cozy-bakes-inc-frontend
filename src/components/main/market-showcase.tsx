"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { CalendarDays, MapPin, Navigation } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import SliderDots from "@/components/ui/slider-dots";
import type { MarketSlide } from "@/interfaces";

type MarketShowcaseProps = {
  slides: MarketSlide[];
  dotsBottom?: string;
  sectionClassName?: string;
  title: ReactNode;
  titleClassName?: string;
};

function MarketCard({ slide }: { slide: MarketSlide }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-background shadow-[0_1px_2px_rgba(16,24,40,0.05),0_0_0_4px_rgba(209,150,40,0.05)]">
      <div className="relative overflow-hidden">
        <Image
          src={slide.image}
          alt={slide.title}
          width={720}
          height={480}
          className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[395px]"
          sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <span className="inline-flex w-fit rounded-full bg-[#FFF5EB] px-4 py-1.5 text-sm font-medium text-[#E67E22]">
          {slide.badge}
        </span>
        <div className="space-y-4">
          <h3 className="text-[24px] font-semibold leading-8 text-[#344054]">
            {slide.title}
          </h3>
          <p className="rounded-2xl border border-[#EEDB9A] bg-[rgba(251,248,235,0.15)] px-4 py-3 text-xs font-semibold italic leading-5 tracking-[-0.1504px] text-primary sm:text-sm">
            {slide.desc}
          </p>
        </div>
        <div className="space-y-3 text-sm font-semibold leading-5 text-[#667085]">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 shrink-0 text-primary" />
            <span>
              {slide.date} - {slide.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-5 shrink-0 text-primary" />
            <span>{slide.address}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="h-13 rounded-lg border border-primary bg-primary text-base font-medium text-white hover:bg-primary/90">
            <Navigation className="size-5 shrink-0" />
            {slide.primaryCta}
          </Button>
          <Button
            variant="outline"
            className="h-13 rounded-lg border-primary bg-transparent text-base font-medium text-primary hover:bg-primary/5 hover:text-primary"
          >
            {slide.secondaryCta}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function MarketShowcase({
  slides,
  dotsBottom = "-bottom-13",
  sectionClassName,
  title,
  titleClassName = "text-center text-heading-2 font-bold sm:text-2xl",
}: MarketShowcaseProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const useStaticGrid = slides.length === 2;

  return (
    <section className={sectionClassName}>
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className={titleClassName}>{title}</div>

        {useStaticGrid ? (
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {slides.map((slide) => (
              <MarketCard key={`${slide.title}-${slide.date}`} slide={slide} />
            ))}
          </div>
        ) : (
          <div className="relative mt-10 rounded-2xl bg-background/90 shadow-lg">
            <Swiper
              className="pb-10"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.realIndex);
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {slides.map((slide) => (
                <SwiperSlide key={`${slide.title}-${slide.date}`}>
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
                    <div className="flex h-full flex-col justify-center rounded-b-2xl border-t-4 border-primary/10 bg-background p-6 sm:p-8 md:rounded-r-2xl md:rounded-bl-none md:border-r-4 md:p-10">
                      <span className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
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
                          <CalendarDays className="size-4 shrink-0 text-primary" />
                          {slide.date} - {slide.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 shrink-0 text-primary" />
                          {slide.address}
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button className="bg-primary hover:bg-primary/90">
                          <Navigation className="size-4 shrink-0" />
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
              count={slides.length}
              activeIndex={activeIndex}
              onSelect={(index) => swiperRef.current?.slideTo(index)}
              bottom={dotsBottom}
              inActiveBg="h-2.5 w-2.5 bg-primary/25 hover:bg-primary/40"
            />
          </div>
        )}
      </div>
    </section>
  );
}
