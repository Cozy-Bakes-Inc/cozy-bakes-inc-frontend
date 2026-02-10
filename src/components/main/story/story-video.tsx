"use client";
import { containerVariants } from "@/lib";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

function StoryVideo() {
  return (
    <section className="bg-bg-creamy py-20">
      <motion.div
        className="mx-auto max-w-7xl px-5 sm:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <ChefHat className="size-5 shrink-0" />
            Behind the Scenes
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl md:text-4xl">
            Crafting Magic,{" "}
            <span className="text-heading-2">Behind Every Loaf</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Discover the craft behind every loaf, from dough to golden
            perfection, where our passion for quality and freshness shines
            through in every bite
          </p>
        </div>

        <motion.div className="mt-10" variants={containerVariants}>
          <video
            src="/images/story-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default StoryVideo;
