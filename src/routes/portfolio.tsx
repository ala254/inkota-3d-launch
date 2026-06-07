import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — InkotaSoft Tech Ltd" },
      { name: "description", content: "Selected work — fintech, dashboards, mobile apps, e-commerce, and cloud platforms." },
      { property: "og:title", content: "Portfolio — InkotaSoft Tech Ltd" },
      { property: "og:description", content: "A showcase of products we've helped imagine, design, and engineer." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

const filters = ["All", "Mobile App", "Web App", "Website", "Software", "Cloud"];

function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <>
      <section className="pt-36 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="container mx-auto px-4 relative text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Selected work
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gradient-hero">
              Work we're proud of.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground mt-6">
              A small slice of the platforms, apps, and products we've shipped over the years.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === f ? "bg-foreground text-background" : "glass hover:bg-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <ProjectCard project={p} kind={i % 3 === 1 ? "phone" : "laptop"} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="relative rounded-3xl overflow-hidden bg-navy text-background p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[500px] rounded-full bg-gold/30 blur-[100px]" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Your project could be next.</h2>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-4 px-7 py-4 rounded-xl bg-gold text-gold-foreground font-semibold hover:scale-105 transition-transform shadow-[var(--shadow-glow)]">
              Let's talk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
