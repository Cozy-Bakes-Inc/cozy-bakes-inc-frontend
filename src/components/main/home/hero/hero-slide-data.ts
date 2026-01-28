export type Slide = {
  videoSrc: string;
  subtitle: string;
  // title parts عشان نلوّن كلمة/كلمتين زي الديزاين
  titleA: string;
  highlight: string;
  titleB: string;
  desc: string;
};

export const heroSlides: Slide[] = [
  {
    videoSrc: "/videos/hero-1.mp4",
    subtitle: "More than a bakery it's a story",
    titleA: "A ",
    highlight: "Cozy Bite",
    titleB: " for Every Moment",
    desc: "Cozy Bakes Inc. started with a simple passion for baking and a love for sharing comfort through food every day. Every pastry and every recipe is made with care, patience, and a deep respect.",
  },
  {
    videoSrc: "/videos/hero-2.mp4",
    subtitle: "Baked Fresh Every Morning",
    titleA: "Pure ",
    highlight: "Ingredients",
    titleB: ". Honest Baking",
    desc: "From golden artisan bread to soft, comforting pastries, our best sellers are baked fresh every day -- each product is carefully crafted to deliver a cozy, homemade experience you can taste.",
  },
  {
    videoSrc: "/videos/hero-3.mp4",
    subtitle: "Why cozy bakes inc",
    titleA: "Naturally ",
    highlight: "Made",
    titleB: ", Carefully Baked",
    desc: "In Cozy Bakes Inc we use handcrafted bakery goods made with natural ingredients, baked fresh every day to bring warmth and comfort to every bite. No artificial flavors, no shortcuts.",
  },
];
