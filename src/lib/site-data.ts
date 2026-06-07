import {
  Smartphone, Globe, CreditCard, Palette, Plug, Code2, Cloud,
  type LucideIcon
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
};

export const services: Service[] = [
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-grade iOS & Android apps built with React Native and Flutter for fluid 60fps experiences.", features: ["iOS & Android", "Offline-first", "Push notifications"] },
  { icon: Globe, title: "Website Development", desc: "Lightning-fast, SEO-optimized websites that convert. From landing pages to enterprise platforms.", features: ["Next.js / TanStack", "Core Web Vitals", "CMS Integration"] },
  { icon: CreditCard, title: "VTU Solutions", desc: "Complete VTU platforms — airtime, data, bills, electricity — with reliable API aggregators.", features: ["Multi-network", "Wallet system", "Reseller portal"] },
  { icon: Palette, title: "UI/UX Design", desc: "Design systems and product experiences that feel premium, accessible, and on-brand.", features: ["Figma systems", "Prototyping", "User research"] },
  { icon: Plug, title: "API Integration", desc: "Securely connect payment gateways, CRMs, and third-party services into your stack.", features: ["Stripe / Paystack", "REST & GraphQL", "Webhooks"] },
  { icon: Code2, title: "Software Development", desc: "Custom SaaS, ERPs, and internal tools engineered for scale, security, and longevity.", features: ["TypeScript", "Microservices", "DevOps"] },
  { icon: Cloud, title: "Cloud Solutions", desc: "AWS, GCP, and Azure architecture — from migration to multi-region high availability.", features: ["Auto-scaling", "CI/CD", "Cost optimization"] },
];

export type Project = {
  title: string;
  category: string;
  tag: string;
  gradient: string;
  metric: string;
};

export const projects: Project[] = [
  { title: "Nimbus Fintech", category: "Fintech Platform", tag: "Mobile App", gradient: "from-[#0B2E6B] to-[#1e40af]", metric: "2.4M users" },
  { title: "OrbitDash", category: "Analytics Dashboard", tag: "Web App", gradient: "from-[#F9A826] to-[#ea580c]", metric: "Real-time" },
  { title: "Voltly VTU", category: "VTU Platform", tag: "Web + Mobile", gradient: "from-[#0B2E6B] to-[#7c3aed]", metric: "₦4B processed" },
  { title: "Mercato Store", category: "E-commerce", tag: "Website", gradient: "from-[#10b981] to-[#0B2E6B]", metric: "+312% sales" },
  { title: "PulseHR", category: "SaaS HR Suite", tag: "Software", gradient: "from-[#F9A826] to-[#0B2E6B]", metric: "180 companies" },
  { title: "CloudForge", category: "DevOps Platform", tag: "Cloud", gradient: "from-[#0B2E6B] to-[#06b6d4]", metric: "99.99% uptime" },
];

export const testimonials = [
  { name: "Adaeze Okafor", role: "CTO, Nimbus Pay", quote: "InkotaSoft rebuilt our fintech app from the ground up. Performance is unreal, and our App Store rating went from 3.1 to 4.8." },
  { name: "Marcus Bennett", role: "Founder, OrbitDash", quote: "They delivered a dashboard that genuinely feels like Linear. Pixel-perfect, blazing fast, and shipped two weeks ahead of schedule." },
  { name: "Funmi Adebayo", role: "Product Lead, Voltly", quote: "Best engineering partner we've worked with. The VTU platform handles millions in monthly volume without a hitch." },
  { name: "Daniel Park", role: "CEO, Mercato", quote: "Sales jumped 312% after the redesign. The team treats design like a craft, not a checkbox." },
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 48, suffix: "", label: "Global Clients" },
  { value: 99, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "+", label: "Years Combined" },
];
