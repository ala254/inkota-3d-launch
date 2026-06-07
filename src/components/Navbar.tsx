import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass shadow-[var(--shadow-elegant)]" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl bg-navy grid place-items-center overflow-hidden">
              <div className="absolute inset-0 bg-[var(--gradient-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-display font-bold text-background dark:text-foreground">I</span>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-gold animate-glow-pulse" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm tracking-tight">INKOTASOFT</div>
              <div className="text-[10px] text-muted-foreground tracking-[0.2em]">TECH LTD</div>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-foreground bg-secondary" }}
                  inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-3 rounded-lg bg-foreground text-background text-sm font-medium"
              >
                Get Started
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
