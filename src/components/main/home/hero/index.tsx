"use client";

import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import HeroSlideContent from "./hero-slide-content";
import { heroSlides } from "@/data";
import SliderDots from "@/components/ui/slider-dots";

export default function HeroVideoSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const playVideo = (i: number) => {
    const v = videoRefs.current[i];
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p) p.catch(() => {});
  };

  const pauseAll = () => {
    videoRefs.current.forEach((v) => v?.pause());
  };

  useEffect(() => {
    playVideo(0);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-84.8px)] overflow-hidden bg-black">
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop
        className="absolute inset-0 h-full w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          pauseAll();
          playVideo(swiper.realIndex);
          setActiveIndex(swiper.realIndex);
        }}
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide
            key={slide.videoSrc}
            className="relative h-full w-full group"
          >
            {/* Video */}
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.videoSrc}
              muted
              playsInline
              preload="metadata"
              onEnded={() => swiperRef.current?.slideNext()}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/20" />

            {/* Content */}
            <HeroSlideContent slide={slide} isActive={activeIndex === i} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SliderDots
        count={heroSlides.length}
        activeIndex={activeIndex}
        onSelect={(index) => swiperRef.current?.slideToLoop(index)}
      />
    </section>
  );
}
