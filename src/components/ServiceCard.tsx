import { useRef, type MouseEvent } from "react";
import type { Service } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
      className="group relative rounded-2xl glass p-6 overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), color-mix(in oklab, var(--gold) 25%, transparent), transparent 50%)" }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy to-navy-deep grid place-items-center shadow-[var(--shadow-elegant)] group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 text-gold" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
        </div>

        <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>

        <ul className="flex flex-wrap gap-2 mb-5">
          {service.features.map((f) => (
            <li key={f} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{f}</li>
          ))}
        </ul>

        <div className="flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-gold transition-colors">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}
