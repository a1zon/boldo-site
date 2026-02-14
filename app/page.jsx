"use client";

import { Button } from "@/components/ui/button";
import { HeroPresentation } from "@/components/hero-presentation";
import { CasesCard } from "@/components/cases-card";
import { ScrollAnimation } from "@/components/scroll-animation";
import {
  IconAPI, IconRegression, IconTestCase, IconMultiPlatform, IconE2E, IconMobile,
  IconBudget, IconScale, IconPartnership, IconShield,
  IconChecklist,
} from "@/components/icons";
import { FloatingShapes, AnimatedDivider } from "@/components/floating-elements";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/* ──────────────────────────────────────────────
   Data from the Boldo pitch deck
   ────────────────────────────────────────────── */

const services = [
  {
    Icon: IconAPI,
    label: "SIT",
    strong: "System Integration Testing",
    text: "API, e-commerce platform, and moderation service integrations — we verify every connection point works flawlessly.",
    color: "from-violet-500/10 to-violet-500/5",
    accent: "violet",
  },
  {
    Icon: IconRegression,
    label: "Regression",
    strong: "Regression Testing",
    text: "After every release we re-check critical paths so new features never break what already works.",
    color: "from-blue-500/10 to-blue-500/5",
    accent: "blue",
  },
  {
    Icon: IconTestCase,
    label: "Test Cases",
    strong: "Test Case Development",
    text: "We design and execute comprehensive test cases covering edge cases your team might miss.",
    color: "from-emerald-500/10 to-emerald-500/5",
    accent: "emerald",
  },
  {
    Icon: IconMultiPlatform,
    label: "Multi-platform",
    strong: "Multi-platform Testing",
    text: "Web, iOS, Android — we cover every platform your users are on with device-specific scenarios.",
    color: "from-amber-500/10 to-amber-500/5",
    accent: "amber",
  },
  {
    Icon: IconE2E,
    label: "E2E",
    strong: "End-to-end Scenarios",
    text: "Full user journey testing: functionality, usability, and basic security in real-world conditions.",
    color: "from-rose-500/10 to-rose-500/5",
    accent: "rose",
  },
  {
    Icon: IconMobile,
    label: "Mobile",
    strong: "Mobile Features",
    text: "Push notifications, offline mode, UGC handling — the tricky parts that make or break mobile experience.",
    color: "from-cyan-500/10 to-cyan-500/5",
    accent: "cyan",
  },
];

const advantages = [
  {
    Icon: IconBudget,
    num: "01",
    title: "Up to 40% budget savings",
    text: "compared to in-house hiring.",
    accent: "text-[--brand-600]",
  },
  {
    Icon: IconScale,
    num: "02",
    title: "Any scale",
    text: "from MVP to enterprise.",
    accent: "text-[--brand-600]",
  },
  {
    Icon: IconPartnership,
    num: "03",
    title: "Long-term partnership",
    text: "and single point of contact.",
    accent: "text-[--brand-600]",
  },
  {
    Icon: IconShield,
    num: "04",
    title: "Reliable ROI",
    text: "fewer bugs → higher retention and conversion.",
    accent: "text-[--brand-600]",
  },
];


/* ──────────────────────────────────────────────
   Animated stat counter (for "40%" etc.)
   ────────────────────────────────────────────── */
function AnimatedStat({ value, suffix = "", isVisible }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const target = parseFloat(value);

  useEffect(() => {
    if (hasAnimated.current || !isVisible) return;
    hasAnimated.current = true;
    const inc = target / 40;
    const id = setInterval(() => {
      setCount((prev) => {
        const next = prev + inc;
        if (next >= target) { clearInterval(id); return target; }
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [target, isVisible]);

  return <>{Math.round(count)}{suffix}</>;
}

/* ──────────────────────────────────────────────
   Main page
   ────────────────────────────────────────────── */
export default function Home() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState('');
  const [expandedService, setExpandedService] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [statVisible, setStatVisible] = useState(false);
  const statRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Ошибка при отправке'); setSubmitStatus('error'); setIsLoading(false); return; }
      setSubmitStatus('success');
      setFormData({ name: '', company: '', email: '', message: '' });
      setIsLoading(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch {
      setError('Ошибка подключения');
      setSubmitStatus('error');
      setIsLoading(false);
    }
  };

  // Reveal animation
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Stat section visibility
  useEffect(() => {
    if (!statRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatVisible(true); },
      { threshold: 0.3 }
    );
    io.observe(statRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollAnimation />
      <main className="flex-1">
        {/* ═══════ HERO (untouched) ═══════ */}
        <HeroPresentation />

        {/* ═══════ 40% STAT + TRANSPARENT APPROACH — from slide 3 ═══════ */}
        <section ref={statRef} className="py-20 md:py-28 bg-[--page-bg]">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* big stat */}
              <div className="reveal rounded-3xl bg-white border border-black/5 shadow-sm p-8 md:p-10 flex flex-col justify-center" data-reveal>
                <div className="text-6xl md:text-7xl font-bold tracking-tight text-[--brand-600] mb-4">
                  <AnimatedStat value="40" suffix="%" isVisible={statVisible} />
                </div>
                <p className="text-xl md:text-2xl font-semibold text-black/80 leading-snug">
                  of SaaS products hit production with critical bugs.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-[--brand-600] text-white text-sm font-medium leading-relaxed">
                  Expert manual QA. Transparent hourly model with detailed reporting and measurable improvements. Strong expertise in video and e-commerce.
                </div>
              </div>

              {/* transparent approach */}
              <div className="reveal rounded-3xl bg-white border border-black/5 shadow-sm p-8 md:p-10 flex flex-col justify-between" data-reveal style={{ transitionDelay: "100ms" }}>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-6">Transparent approach</h3>
                  <div className="space-y-4">
                    {[
                      "Detailed reports at every stage",
                      "Specific improvements with priorities",
                      "Real-time monitoring and metrics",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-[--brand-500]/10 text-[--brand-600] grid place-items-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 7h10M8 3l4 4-4 4" />
                          </svg>
                        </div>
                        <span className="text-base text-black/65 font-medium group-hover/item:text-black/80 transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality highlights from slide 4 */}
                <div className="mt-8 pt-6 border-t border-black/5 space-y-3">
                  <h4 className="text-sm font-semibold text-black/70 uppercase tracking-wide">Quality commitment</h4>
                  {[
                    "Zero critical bugs in production releases",
                    "Stable operation under peak loads",
                    "Complex digital products — tested stably, quickly, and transparently",
                  ].map((item, i) => (
                    <p key={i} className="text-sm text-black/55 font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[--brand-500] flex-shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ WHY CHOOSE US — from slide 7 (4 advantages) ═══════ */}
        <section className="py-24 md:py-32 bg-[--page-bg] relative overflow-hidden">
          <FloatingShapes />
          <div className="container mx-auto max-w-5xl px-6">
            <div className="reveal mb-12" data-reveal>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                Why choose us
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {advantages.map((adv, idx) => (
                <div
                  key={adv.num}
                  className="reveal group relative rounded-2xl bg-white border border-black/5 shadow-sm p-7 hover:shadow-lg hover:border-black/10 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  data-reveal
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[--brand-500]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[--brand-500]/10 text-[--brand-600] grid place-items-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[--brand-500]/15">
                      <adv.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-black/30 uppercase tracking-widest">{adv.num}</span>
                      <h3 className="text-lg font-semibold text-black mt-1">
                        <span className={adv.accent}>{adv.title}</span>
                      </h3>
                      <p className="text-sm text-black/55 font-medium mt-1">{adv.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ TEAM EXPERIENCE ═══════ */}
        <section className="py-16 md:py-20 bg-[--page-bg]">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="reveal rounded-3xl bg-white border border-black/5 shadow-sm p-8 md:p-12" data-reveal>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
                  Team Experience
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <p className="text-base text-black/55 font-medium leading-relaxed">
                    Our team comes from big tech and top-tier product companies. We've shipped and battle-tested platforms handling millions of users, high-load video streaming, and complex e-commerce flows at scale.
                  </p>
                  <p className="text-base text-black/55 font-medium leading-relaxed">
                    We don't just find bugs — we think like engineers. Years of experience in enterprise-grade QA means we know exactly where products break and how to prevent it before your users ever notice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatedDivider />

        {/* ═══════ SERVICES — from slide 8 ═══════ */}
        <section id="services" className="py-24 md:py-32 bg-[--page-bg] relative">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="space-y-12">
              <div className="reveal" data-reveal>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  What we offer
                </h2>
                <p className="mt-4 text-lg text-black/60 font-medium max-w-2xl">
                  Expert manual QA for SaaS and video-commerce products — from integrations to
                  mobile features and end-to-end scenarios.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {services.map((item, idx) => (
                  <div key={item.label} className="reveal" data-reveal style={{ transitionDelay: `${idx * 80}ms` }}>
                    <div
                      className="group relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-black/10 hover:-translate-y-0.5"
                      onClick={() => setExpandedService(expandedService === idx ? null : idx)}
                    >
                      {/* gradient bg on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* expanded description overlay */}
                      <div className={`absolute inset-0 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center p-6 z-10 transition-opacity duration-300 ${expandedService === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <p className="text-sm text-black/70 font-medium leading-relaxed">
                          {item.text}
                        </p>
                      </div>

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[--brand-500]/10 text-[--brand-600] grid place-items-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                              <item.Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-semibold text-black">{item.strong}</h3>
                          </div>
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-[--brand-500]/10 text-[--brand-600] grid place-items-center text-sm font-medium transition-transform duration-300 ${expandedService === idx ? "rotate-45" : "group-hover:rotate-12"}`}>
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CASES — slides 5-6 ═══════ */}
        <section id="cases" className="py-24 md:py-32 bg-[--page-bg]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="space-y-12">
              <div className="reveal" data-reveal>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  Cases
                </h2>
                <p className="mt-4 text-lg text-black/60 font-medium max-w-2xl">
                  Real results from real projects — here's how we helped our clients ship stable, high-quality products.
                </p>
              </div>
              <CasesCard />
            </div>
          </div>
        </section>

        {/* ═══════ CONTACT — slide 9 ═══════ */}
        <section id="contact" className="py-24 md:py-32 bg-[--page-bg] relative overflow-hidden">
          <FloatingShapes variant="purple" />

          <div className="container mx-auto max-w-6xl px-6 relative">
            <div className="grid gap-12 md:grid-cols-2 md:items-start">
              <div className="space-y-6 reveal" data-reveal>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  Ready for a QA check?
                </h2>
                <p className="text-lg text-black/60 font-medium leading-relaxed">
                  Free 1-hour QA audit for your product. We review flows, risks, and suggest
                  specific improvements for stability and UX.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { Icon: IconMultiPlatform, text: "Manual QA for web, mobile, and video platforms" },
                    { Icon: IconChecklist, text: "Clear reports with priorities and estimates" },
                    { Icon: IconScale, text: "Flexible model: hourly or fixed scope" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 group/item">
                      <div className="w-8 h-8 rounded-lg bg-[--brand-500]/10 text-[--brand-600] grid place-items-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110">
                        <item.Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-black/65 font-medium group-hover/item:text-black/80 transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 space-y-3">
                  {[
                    { label: "Email", value: "andrew@boldo.agency", href: "mailto:andrew@boldo.agency" },
                    { label: "Website", value: "boldo.agency", href: "https://boldo.agency" },
                    { label: "Telegram", value: "@AndrewGeiger", href: "https://t.me/AndrewGeiger" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex items-center gap-3 text-sm font-medium text-black/55 hover:text-[--brand-600] transition-colors duration-200 group/link"
                    >
                      <span className="text-black/40 w-16">{item.label}</span>
                      <span className="underline underline-offset-2 decoration-black/15 group-hover/link:decoration-[--brand-500] transition-colors">
                        {item.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="reveal" data-reveal style={{ transitionDelay: "100ms" }}>
                <div className="rounded-3xl bg-white shadow-lg border border-black/5 p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[--brand-500]/5 rounded-full blur-3xl pointer-events-none" />

                  <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {[
                      { id: "name", label: "Имя", type: "text", placeholder: "Ваше имя" },
                      { id: "company", label: "Компания", type: "text", placeholder: "Название компании" },
                      { id: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label htmlFor={field.id} className={`text-sm font-medium transition-colors duration-200 ${focusedField === field.id ? "text-[--brand-600]" : "text-black/70"}`}>
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 border border-black/10 rounded-xl bg-white text-black placeholder:text-black/30 font-medium focus:outline-none focus:border-[--brand-500] focus:ring-2 focus:ring-[--brand-500]/10 transition-all duration-200"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}

                    <div className="space-y-2">
                      <label htmlFor="message" className={`text-sm font-medium transition-colors duration-200 ${focusedField === "message" ? "text-[--brand-600]" : "text-black/70"}`}>
                        Расскажите о проекте
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border border-black/10 rounded-xl bg-white text-black placeholder:text-black/30 font-medium focus:outline-none focus:border-[--brand-500] focus:ring-2 focus:ring-[--brand-500]/10 transition-all duration-200 resize-none"
                        placeholder="Тип продукта, платформа, сроки, ожидаемый результат"
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <span className="text-emerald-500">✓</span>
                        Заявка отправлена! Мы свяжемся с вами в течение 24 часов.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
                        ✕ {error || 'Ошибка при отправке. Попробуйте позже.'}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full font-semibold h-12 rounded-xl bg-black hover:bg-black/85 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      size="lg"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Отправляю...
                        </span>
                      ) : (
                        'Отправить запрос на аудит'
                      )}
                    </Button>
                    <p className="text-xs text-black/40 font-medium text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-black/5 bg-white/50 backdrop-blur-sm py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="text-xl font-semibold tracking-tight text-black">BOLDO</div>
              <div className="text-sm text-black/50 font-medium max-w-md">
                Reliable manual testing for video SaaS and social shopping projects.
              </div>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm font-medium">
              {[
                { href: "#services", label: "Услуги" },
                { href: "#cases", label: "Кейсы" },
                { href: "#contact", label: "Контакты" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-black/8 bg-white px-5 py-2.5 text-black/60 transition-all duration-200 hover:border-[--brand-500]/30 hover:text-[--brand-600] hover:shadow-sm hover:bg-[--brand-500]/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-black/5 text-xs text-black/35 font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Boldo QA Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
