"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Slide } from "@/interfaces";
import Image from "next/image";

type HeroSlideContentProps = {
  slide: Slide;
  isActive: boolean;
};

export default function HeroSlideContent({
  slide,
  isActive,
}: HeroSlideContentProps) {
  return (
    <div className="relative mx-auto max-w-7xl h-full px-5 sm:px-20 2xl:px-0 flex items-center">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <div>
            <Image
              src="/images/hero-section-bread.svg"
              alt="beard"
              height={20}
              width={20}
            />
          </div>
          <span>{slide.subtitle}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -32 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          <span className="text-white">{slide.titleA}</span>
          <span className="text-primary">{slide.highlight}</span>
          <span className="text-white">{slide.titleB}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 28 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="mt-5 text-base leading-7 text-white/80 sm:text-lg max-w-4xl"
        >
          {slide.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button
            variant="outline"
            className="bg-primary border-transparent text-white hover:bg-primary/90 py-6"
          >
            <ShoppingBag className="size-4" />
            Shopping Now
          </Button>

          <Button
            variant="outline"
            className="border-white/35 bg-white/10 text-white hover:bg-white/15 hover:text-white py-6"
          >
            Explore Our Menu
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -28 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
          transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
          className="mt-5 text-base text-white/80 sm:text-lg flex items-center gap-2 leading-5"
        >
          <span className="block bg-[#12B76A] h-2 w-2 rounded-full transition shrink-0" />
          Baked daily, Farmers Day only 2 special days!
        </motion.p>
      </div>
    </div>
  );
}
