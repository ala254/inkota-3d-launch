import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero3D } from "@/components/Hero3D";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Testimonials } from "@/components/Testimonials";
import { Counter } from "@/components/Counter";
import { services, projects, stats } from "@/lib/site-data";
import { ArrowRight, Sparkles, Zap, Shield, Layers } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InkotaSoft Tech Ltd — Innovating Digital Solutions" },
      { name: "description", content: "Premium 3D-crafted software, mobile, web, and cloud experiences engineered for ambitious brands worldwide." },
      { property: "og:title", content: "InkotaSoft Tech Ltd — Innovating Digital Solutions" },
      { property: "og:description", content: "World-class software engineering. Mobile, web, VTU, cloud and more." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-navy/30 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  Building the future of software — today
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                  Innovating
                  <br />
                  <span className="text-gradient-gold">Digital Solutions</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                  InkotaSoft Tech crafts premium software, mobile apps, and cloud platforms
                  for ambitious teams. Apple-grade polish. Stripe-level reliability.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity shadow-[var(--shadow-elegant)]">
                    Start a project
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-medium hover:bg-secondary transition-colors">
                    View our work
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
                  {stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
                        <Counter to={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="relative h-[420px] md:h-[560px] lg:h-[640px] rounded-3xl overflow-hidden">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <section className="py-12 border-y border-border/50 bg-secondary/40 overflow-hidden">
        <div className="container mx-auto px-4 mb-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Trusted by teams building the next big thing</p>
        </div>
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[..."NIMBUS ORBIT VOLTLY MERCATO PULSE CLOUDFORGE LATTICE NEXUS NIMBUS ORBIT VOLTLY MERCATO PULSE CLOUDFORGE LATTICE NEXUS".split(" ")].map((name, i) => (
            <span key={i} className="font-display text-2xl font-bold text-muted-foreground/40 tracking-widest">{name}</span>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeader eyebrow="Why InkotaSoft" title="Engineered for the world's most ambitious teams" subtitle="We don't just ship features — we craft experiences that compound into competitive advantage." />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Blazing performance", desc: "Sub-100ms interactions. Core Web Vitals in the green. Always." },
            { icon: Shield, title: "Enterprise security", desc: "SOC2-ready architectures, RLS, audit trails, zero-trust by default." },
            { icon: Layers, title: "Built to scale", desc: "From MVP to millions of users without rebuilding from scratch." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 h-full">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy to-navy-deep grid place-items-center mb-4">
                  <f.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeader eyebrow="What we do" title="Services that ship results" subtitle="Seven core practices, one unified team. We integrate with your business — not the other way around." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[800px] rounded-full bg-gold/20 blur-[120px]" />
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

      {/* PORTFOLIO PREVIEW */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeader eyebrow="Selected work" title="Products people actually love" subtitle="A glimpse into the platforms we've helped imagine, design, and engineer." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <ProjectCard project={p} kind={i % 3 === 1 ? "phone" : "laptop"} />
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-medium hover:bg-secondary">
            See full portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-24">
        <SectionHeader eyebrow="Client voices" title="Trusted by founders & CTOs" />
        <Testimonials />
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative rounded-3xl overflow-hidden bg-navy text-background p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[500px] rounded-full bg-gold/30 blur-[100px]" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Let's build something exceptional.</h2>
            <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto mb-8">Tell us about your project. We'll respond within one business day with a tailored proposal.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gold text-gold-foreground font-semibold hover:scale-105 transition-transform shadow-[var(--shadow-glow)]">
              Start your project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
