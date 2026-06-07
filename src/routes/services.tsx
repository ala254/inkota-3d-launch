import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/site-data";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — InkotaSoft Tech Ltd" },
      { name: "description", content: "Mobile apps, websites, VTU, UI/UX, API integration, software, and cloud — engineered to ship." },
      { property: "og:title", content: "Services — InkotaSoft Tech Ltd" },
      { property: "og:description", content: "Seven core practices to take your product from idea to industry-leading." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const process = [
  { step: "01", title: "Discover", desc: "We learn your business, audience, and goals." },
  { step: "02", title: "Design", desc: "Wireframes evolve into pixel-perfect, on-brand prototypes." },
  { step: "03", title: "Build", desc: "Iterative sprints with weekly demos and full transparency." },
  { step: "04", title: "Launch & evolve", desc: "We ship, monitor, and continuously improve." },
];

function Services() {
  return (
    <>
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="container mx-auto px-4 relative text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> What we do
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gradient-hero">
              Services built to ship.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground mt-6">
              Seven specialized practices, one accountable team. We don't hand off — we deliver.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionHeader eyebrow="How we work" title="A process that respects your time" />
        <div className="grid md:grid-cols-4 gap-5">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="relative glass rounded-2xl p-6 h-full">
                <div className="font-display text-5xl font-bold text-gold/30 mb-3">{p.step}</div>
                <h3 className="font-display font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-gradient-hero">Engagement models</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you need a swift sprint or a long-term partner, we have a model that fits.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium">
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="space-y-3">
            {[
              { name: "Project sprint", desc: "Fixed scope, fixed timeline. Perfect for MVPs and discrete launches." },
              { name: "Dedicated team", desc: "An embedded squad working as an extension of your org." },
              { name: "Fractional CTO", desc: "Strategic technical leadership without the full-time overhead." },
            ].map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="glass rounded-2xl p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gold grid place-items-center shrink-0">
                    <Check className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
