import { Crown, Heart, Leaf, ShieldCheck } from "lucide-react";

const commitments = [
  {
    title: "Handcrafted Daily",
    description:
      "Every product is made fresh each morning using time-honored baking techniques.",
    icon: Crown,
  },
  {
    title: "Natural Ingredients",
    description:
      "Only simple, locally sourced ingredients with no artificial additives.",
    icon: Leaf,
  },
  {
    title: "Made with Love",
    description:
      "Passion in every step, from family recipes to the final golden finish.",
    icon: Heart,
  },
  {
    title: "No Preservatives",
    description:
      "100% pure, authentic baking with zero preservatives or chemicals.",
    icon: ShieldCheck,
  },
];

export default function StoryCommitment() {
  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <Crown className="size-5 shrink-0" />
            Our Commitment
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl md:text-4xl">
            What Makes Us <span className="text-heading-2">Different</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Our dedication to quality, authenticity, and traditional
            craftsmanship sets us apart in everything we bake.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="pointer-events-none absolute -right-8 -top-8 size-16 rotate-45 bg-primary/10" />
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5 shrink-0" />
                </div>
                <h3 className="text-base font-semibold text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
