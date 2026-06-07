import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { stats } from "@/lib/site-data";
import { Target, Compass, Heart, Rocket, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — InkotaSoft Tech Ltd" },
      { name: "description", content: "Meet the team building world-class software experiences at InkotaSoft Tech Ltd." },
      { property: "og:title", content: "About — InkotaSoft Tech Ltd" },
      { property: "og:description", content: "Our story, mission, and the people behind the code." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Target, title: "Craft over quantity", desc: "We'd rather ship one extraordinary thing than ten average ones." },
  { icon: Compass, title: "Honest partnership", desc: "Transparent timelines, clear pricing, no agency theatre." },
  { icon: Heart, title: "Empathy-led design", desc: "Every pixel and API decision starts with the person on the other side." },
  { icon: Rocket, title: "Ship and iterate", desc: "Velocity is a feature. We move fast without breaking things that matter." },
];

function About() {
  return (
    <>
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="container mx-auto px-4 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> About InkotaSoft
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-3xl text-gradient-hero">
              A studio of engineers, designers, and product obsessives.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mt-6">
              Founded with a singular belief: software should feel as good as it works.
              We partner with founders and enterprise teams to ship products people love
              to use — and competitors hate to compete with.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="relative aspect-square rounded-3xl overflow-hidden glass p-8">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-gradient-to-br from-navy to-gold blur-3xl opacity-30" />
              <div className="relative h-full grid place-items-center">
                <div className="text-center">
                  <div className="font-display text-7xl md:text-9xl font-bold text-gradient-gold">2019</div>
                  <div className="text-sm text-muted-foreground mt-2 tracking-[0.3em]">FOUNDED</div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our mission</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To democratize world-class software engineering — bringing the polish of
                Apple, the reliability of Stripe, and the velocity of Linear to every
                ambitious team, regardless of size or geography.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From our base, we've delivered platforms for fintech unicorns, government
                programs, and venture-backed startups across four continents.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/services" className="inline-flex items-center gap-2 font-medium text-gold hover:gap-3 transition-all">
                Explore our services <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionHeader eyebrow="What we stand for" title="Values that compound" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy to-navy-deep grid place-items-center mb-4">
                  <v.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-background">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <div className="font-display text-4xl md:text-6xl font-bold text-gold mb-2">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm opacity-70">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
