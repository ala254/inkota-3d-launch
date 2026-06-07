import { Reveal } from "./Reveal";

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-14`}>
      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-glow-pulse" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-hero">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
