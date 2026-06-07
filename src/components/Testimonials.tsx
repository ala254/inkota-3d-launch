import { useEffect, useState } from "react";
import { testimonials } from "@/lib/site-data";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <Quote className="absolute -top-2 -left-2 h-32 w-32 text-gold/10" />
        <div className="relative">
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-display text-xl md:text-2xl leading-relaxed mb-8">"{t.quote}"</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)} className="h-10 w-10 rounded-full glass grid place-items-center hover:bg-gold hover:text-gold-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5 mx-2">
                {testimonials.map((_, idx) => (
                  <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-1.5 bg-muted-foreground/30"}`} />
                ))}
              </div>
              <button onClick={() => setI((p) => (p + 1) % testimonials.length)} className="h-10 w-10 rounded-full glass grid place-items-center hover:bg-gold hover:text-gold-foreground transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
