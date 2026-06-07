import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — InkotaSoft Tech Ltd" },
      { name: "description", content: "Get in touch. We respond within one business day." },
      { property: "og:title", content: "Contact — InkotaSoft Tech Ltd" },
      { property: "og:description", content: "Tell us about your project. We'll be in touch within a business day." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <section className="pt-36 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="container mx-auto px-4 relative text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Let's connect
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gradient-hero">
              Start your project.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground mt-6">
              Tell us a bit about what you're building. We'll respond within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@inkotasoft.tech" },
                { icon: Phone, label: "Phone", value: "+234 905 735 2833" },
                { icon: MapPin, label: "Office", value: "Lagos, Nigeria" },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5 flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-navy to-navy-deep grid place-items-center shrink-0">
                    <c.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="glass rounded-2xl p-5">
                <div className="text-xs text-muted-foreground mb-2">Response time</div>
                <div className="font-display text-3xl font-bold text-gradient-gold">&lt; 24 hrs</div>
                <p className="text-sm text-muted-foreground mt-2">We read every message personally.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="glass rounded-3xl p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Company" name="company" />
              <Field label="Budget" name="budget" placeholder="e.g. $10k – $50k" />
              <div>
                <label className="block text-sm font-medium mb-2">Project details</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you're building..."
                  className="w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-all disabled:bg-gold disabled:text-gold-foreground"
              >
                {sent ? (<><Check className="h-4 w-4" /> Message sent — we'll be in touch!</>) : (<><Send className="h-4 w-4" /> Send message</>)}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
      />
    </div>
  );
}
