import type { Project } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project, kind = "laptop" }: { project: Project; kind?: "laptop" | "phone" | "dashboard" }) {
  return (
    <div className="group relative rounded-3xl glass p-6 overflow-hidden hover:-translate-y-2 transition-transform duration-500">
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-colors" />

      {/* 3D mockup */}
      <div className="relative h-56 mb-6 grid place-items-center [perspective:1000px]">
        {kind === "phone" ? (
          <div className={`relative h-full w-32 rounded-[28px] bg-gradient-to-br ${project.gradient} shadow-[var(--shadow-elegant)] [transform:rotateY(-15deg)_rotateX(8deg)] group-hover:[transform:rotateY(-5deg)_rotateX(2deg)] transition-transform duration-700`}>
            <div className="absolute inset-1.5 rounded-[24px] bg-background/10 backdrop-blur-sm" />
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-black/40" />
            <div className="absolute bottom-6 left-3 right-3 space-y-2">
              <div className="h-2 rounded-full bg-white/60" />
              <div className="h-2 w-3/4 rounded-full bg-white/40" />
              <div className="h-8 rounded-lg bg-white/30 mt-4" />
            </div>
          </div>
        ) : (
          <div className={`relative h-full w-full rounded-xl bg-gradient-to-br ${project.gradient} shadow-[var(--shadow-elegant)] [transform:rotateX(15deg)_rotateY(-8deg)] group-hover:[transform:rotateX(5deg)_rotateY(-2deg)] transition-transform duration-700`}>
            <div className="absolute inset-3 rounded-lg bg-background/10 backdrop-blur-sm p-3">
              <div className="flex gap-1.5 mb-3">
                <span className="h-2 w-2 rounded-full bg-white/60" />
                <span className="h-2 w-2 rounded-full bg-white/60" />
                <span className="h-2 w-2 rounded-full bg-white/60" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-1/3 rounded-full bg-white/70" />
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  <div className="h-10 rounded bg-white/40" />
                  <div className="h-10 rounded bg-white/30" />
                  <div className="h-10 rounded bg-white/40" />
                </div>
                <div className="h-12 rounded bg-white/30 mt-1.5" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground mb-1">{project.category}</div>
          <h3 className="font-display text-lg font-semibold">{project.title}</h3>
          <div className="text-xs text-gold font-medium mt-1">{project.metric}</div>
        </div>
        <div className="h-9 w-9 rounded-full bg-secondary grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
