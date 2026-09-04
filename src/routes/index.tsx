import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Dumbbell,
  Leaf,
  ShieldCheck,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { WHATSAPP_NUMBER } from "@/components/site/WhatsAppFab";
import { seo } from "@/lib/seo";
import heroImg from "@/assets/founders.jpeg";
import personalHealth from "@/assets/personal-health.png";
import nutritionImg from "@/assets/hero-lifestyle-new.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "DUOFIT — Health, Designed to Last. | Nutrition & Fitness Coaching",
      description:
        "Personalised fitness and nutrition coaching built around your goals, lifestyle and long-term health.",
      path: "/",
    }),
  component: Home,
});

// ── Programs ──────────────────────────────────────────────────────────────
const programs = [
  {
     slug: "personal-health-coaching",
    icon: Dumbbell,
   img: personalHealth,

   title: "Personal Health Coaching",

  desc: "A holistic approach to nutrition, fitness, sleep and lifestyle — built around your goals, not a generic plan.",

  },
  {
   slug: "family-health-habits",

    icon: Leaf,
    img: "https://i.pinimg.com/originals/3e/d3/38/3ed33865182657c8cb456c0862ae2386.jpg",

   title: "Family Health & Habits",
    desc: "Helping families build healthier routines together through practical nutrition, movement and everyday habits.",

  },
];

// ── Why DUOFIT checklist ────────────────────────────────────────────────
const whyChecklist = [
  "Personalised Plans",
  "Evidence-Informed",
  "Sustainable Results",
  "Coach Support",
  "Real Accountability",
];

// ── Testimonials ────────────────────────────────────────────────────────
// ⚠️ These are placeholder testimonials matching the reference layout —
// swap in real client quotes before publishing.
const testimonials = [
  {
    quote: "DUOFIT helped me build a routine that fits my work schedule. I feel stronger, more energetic and more confident than ever.",
    name: "Arjun R.",
  },
  {
    quote: "The nutrition guidance was practical and easy to follow. It's not just about looking better, it's about feeling better.",
    name: "Neha P.",
  },
  {
    quote: "I've trained before, but never saw consistent results. The structured approach at DUOFIT changed that.",
    name: "Karan S.",
  },
];

// ── Existing interactive Venn diagram — unchanged from current site ─────
function VennDiagram() {
  const [active, setActive] = useState<number | null>(null);

  const items = [
    { label: "Nutrition", desc: "Simple food choices that work with your routine and availability.", cx: 300, cy: 170, light: "#34d399", dark: "#059669" },
    { label: "Fitness & Movement", desc: "Helping your body move consistently instead of extreme routines.", cx: 430, cy: 300, light: "#fb923c", dark: "#ea580c" },
    { label: "Family Health", desc: "Helping families build healthier routines together.", cx: 300, cy: 430, light: "#c084fc", dark: "#7c3aed" },
    { label: "Healthy Habits", desc: "Small sustainable changes that become easier to maintain.", cx: 170, cy: 300, light: "#38bdf8", dark: "#0284c7" },
  ];

  const R = 130;
  const CX = 300;
  const CY = 300;

  const displayItems = active !== null
    ? [...items.filter((_, i) => i !== active), items[active]]
    : items;

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full max-w-[700px] mx-auto overflow-visible">
        <svg viewBox="0 0 600 600" className="w-full h-auto" style={{ overflow: "visible" }}>
          <defs>
            {items.map((item, i) => (
              <radialGradient key={i} id={`rg${i}`} cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor={item.light} />
                <stop offset="100%" stopColor={item.dark} />
              </radialGradient>
            ))}
            <filter id="shadow">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.22" />
            </filter>
          </defs>

          {displayItems.map((item) => {
            const i = items.findIndex((x) => x.label === item.label);
            const isActive = active === i;
            const isInactive = active !== null && active !== i;
            return (
              <g
                key={i}
                onClick={() => setActive(active === i ? null : i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  cursor: "pointer",
                  filter: isActive ? `drop-shadow(0 0 30px ${item.dark})` : "url(#shadow)",
                }}
              >
                <circle
                  cx={item.cx} cy={item.cy}
                  r={isActive ? R + 18 : R}
                  fill={`url(#rg${i})`}
                  fillOpacity={isActive ? 0.95 : isInactive ? 0.45 : 0.78}
                  style={{ transition: "all .35s ease" }}
                />
                {item.label === "Fitness & Movement" ? (
                  <>
                    <text x={item.cx} y={item.cy - 10} textAnchor="middle" fill="white" fontSize="14" fontWeight="900" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" paintOrder="stroke">FITNESS &</text>
                    <text x={item.cx} y={item.cy + 12} textAnchor="middle" fill="white" fontSize="14" fontWeight="900" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" paintOrder="stroke">MOVEMENT</text>
                  </>
                ) : (
                  <text x={item.cx} y={item.cy + 6} textAnchor="middle" fill="white" fontSize="15" fontWeight="900" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" paintOrder="stroke" letterSpacing="0.4">
                    {item.label.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}

          <g style={{ pointerEvents: "none" }}>
            <circle cx={CX} cy={CY} r="70" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="4"
              style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.15))" }}
            />
            <text x={CX} y={CY + 6} textAnchor="middle" fill="var(--color-primary)" fontSize="20" fontWeight="800">
              HEALTH
            </text>
          </g>
        </svg>
      </div>

      <div className="w-full max-w-[700px] min-h-[80px]">
        {active !== null ? (
          <div className="rounded-xl p-4 border text-center"
            style={{ background: `${items[active].light}15`, borderColor: `${items[active].light}55` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: items[active].dark }}>
              {items[active].label}
            </p>
            <p className="text-sm text-muted-foreground">{items[active].desc}</p>
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground italic">
            <span className="md:hidden">Tap</span>
            <span className="hidden md:inline">Hover</span>
            {" "}a circle to learn more
          </p>
        )}
      </div>
    </div>
  );
}

const shimmerBtn =
  "group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold uppercase tracking-widest rounded-full min-h-[44px] overflow-hidden transition-all duration-300 hover:brightness-110 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] active:scale-95";
const shimmerSpan =
  "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none";

function Home() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;

  return (
    <SiteLayout>

      {/* HERO */}
      <section className="container-editorial pt-10 md:pt-16 pb-14 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-foreground">
                Health,<br />
                <span className="italic text-primary">Designed</span> to Last.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                Personalised fitness and nutrition coaching built around your
                goals, lifestyle and long-term health.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className={shimmerBtn} style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}>
                  <span className={shimmerSpan} />
                  Start Your Journey <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/about" className={`${shimmerBtn} border border-border text-foreground`}>
                  Our Approach <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {[personalHealth, nutritionImg, heroImg, personalHealth].map((img, i) => (
                      <img key={i} src={img} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                    ))}
                  </div>
                  <div className="text-xs leading-tight">
                    <span className="block font-bold text-foreground">500+</span>
                    <span className="block text-muted-foreground">People Transformed</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-xs leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-foreground">4.9/5</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <span className="block text-muted-foreground mt-0.5">From 150+ Reviews</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-muted/60 scale-90 -z-10" />
              <div className="overflow-hidden rounded-3xl aspect-[4/3] bg-muted">
                <img src={heroImg} alt="DUOFIT coaches" className="h-full w-full object-cover" loading="eager" />
              </div>
              <div className="absolute -bottom-5 left-5 bg-card border border-border rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Certified Experts</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-cream border-y border-border">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
            <div>
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Coaching Programs</span>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Programs Designed<br />For Real Life.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                View All Programs <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.slug} delay={100 + i * 100}>
                  <Link
                    to="/programs"
                    hash={p.slug}
                    className="group flex bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]"
                  >
                    <div className="relative w-2/5 shrink-0 overflow-hidden">
                      <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-3 left-3 h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-foreground mb-1.5 transition-colors group-hover:text-primary">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground group-hover:gap-2.5 transition-all">
                        Learn More <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY DUOFIT — Venn diagram (existing interactive component, per instruction) */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_1.15fr_0.7fr] gap-10 lg:gap-8 items-center">

          <div>
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Why DUOFIT?</span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                More Than<br />Workouts.
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-2 text-lg md:text-xl italic text-primary leading-snug">
                A Complete System<br />For Your Health.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                At DUOFIT, we focus on the pillars that truly build lasting
                health — and combine them in a way that works for real life.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-7">
                <Link to="/about" className={shimmerBtn} style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}>
                  <span className={shimmerSpan} />
                  Our Approach <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <VennDiagram />
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-3.5">
              {whyChecklist.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream border-y border-border">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
            <div>
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Real People. Real Results.</span>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground leading-tight">What Our Clients Say.</h2>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                See More Reviews <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={100 + i * 80}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
                  <Quote className="h-5 w-5 text-primary/40 mb-2" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4 flex-1">"{t.quote}"</p>
                  <span className="text-xs font-semibold text-muted-foreground">{t.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-editorial py-16 md:py-20">
        <Reveal>
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Ready to Begin?</span>
                <h3 className="text-xl md:text-2xl font-bold mt-1">Your Health Journey Starts Now.</h3>
                <p className="text-sm text-primary-foreground/80 mt-1">Let's build a stronger, healthier and happier you.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 py-3.5 text-sm font-semibold rounded-full hover:brightness-95 active:scale-95 transition-all">
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/85 hover:text-primary-foreground transition-colors">
                or WhatsApp Us <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

    </SiteLayout>
  );
}