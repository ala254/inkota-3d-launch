import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/inkotasoft-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-navy text-background dark:bg-card dark:text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-gold/20 blur-[120px]" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-4 inline-block rounded-xl bg-white p-3">
              <img
                src={logoAsset.url}
                alt="InkotaSoft Tech Ltd — Innovating Digital Solutions"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm opacity-70 max-w-md leading-relaxed">
              We engineer premium software, mobile, and cloud experiences for ambitious
              brands worldwide. Built for performance. Designed for delight.
            </p>
            <div className="flex gap-3 mt-6">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-lg bg-white/10 hover:bg-gold hover:text-gold-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:text-gold">About</Link></li>
              <li><Link to="/services" className="hover:text-gold">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> Lagos, Nigeria</li>
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold" /> hello@inkotasoft.tech</li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold" /> +234 800 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <div>© {new Date().getFullYear()} INKOTASOFT TECH LTD. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
