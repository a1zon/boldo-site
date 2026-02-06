"use client";

import { Button } from "@/components/ui/button";
import { HeroPresentation } from "@/components/hero-presentation";
import { CasesCard } from "@/components/cases-card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
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

      if (!res.ok) {
        setError(data.error || 'Ошибка при отправке');
        setSubmitStatus('error');
        setIsLoading(false);
        return;
      }

      setSubmitStatus('success');
      setFormData({ name: '', company: '', email: '', message: '' });
      setIsLoading(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      console.error('Form error:', err);
      setError('Ошибка подключения');
      setSubmitStatus('error');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroPresentation />

        <section id="services" className="py-24 md:py-32 bg-[--page-bg]">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="space-y-10">
              <div className="reveal" data-reveal>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  What we offer
                </h2>
                <p className="mt-4 text-lg text-black/60 font-medium max-w-2xl">
                  Expert manual QA for SaaS and video-commerce products — from integrations to
                  mobile features and end‑to‑end scenarios.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "SIT",
                    strong: "SIT:",
                    text: "testing integrations (API, e-com, moderation)",
                  },
                  {
                    label: "Regression",
                    strong: "Regression:",
                    text: "testing after releases",
                  },
                  {
                    label: "Development",
                    strong: "Development:",
                    text: "and execution of test cases",
                  },
                  {
                    label: "Multi-platform",
                    strong: "Multi-platform:",
                    text: "testing (web, iOS, Android)",
                  },
                  {
                    label: "End-to-end",
                    strong: "End-to-end:",
                    text: "scenarios (functionality, usability, basic security)",
                  },
                  {
                    label: "Mobile features",
                    strong: "Mobile features:",
                    text: "push notifications, offline mode, UGC",
                  },
                ].map((item) => (
                  <div key={item.label} className="reveal" data-reveal>
                    <div className="flex items-center justify-between gap-4 rounded-full bg-white shadow-sm px-6 py-4 border border-black/5">
                      <p className="text-base md:text-lg text-black/70 font-medium">
                        <span className="font-semibold text-black">{item.strong}</span>{" "}
                        {item.text}
                      </p>
                      <div className="ml-4 flex-shrink-0 h-10 w-10 rounded-full bg-[--brand-500] text-white grid place-items-center">
                        →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="py-24 md:py-32 bg-[--page-bg]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="space-y-16">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                Cases
              </h2>
              <CasesCard />
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 md:py-32 bg-[--page-bg]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <div className="space-y-5">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                  Ready for a QA check?
                </h2>
                <p className="text-lg text-black/65 font-medium">
                  Free 1‑hour QA audit for your product. We review flows, risks, and suggest
                  specific improvements for stability and UX.
                </p>
                <ul className="space-y-2 text-sm text-black/65 font-medium">
                  <li>— Manual QA for web, mobile, and video platforms</li>
                  <li>— Clear reports with priorities and estimates</li>
                  <li>— Flexible model: hourly or fixed scope</li>
                </ul>

                <div className="pt-4 space-y-1 text-sm text-black/60 font-medium">
                  <div>Email: <a href="mailto:andrew@boldo.agency" className="underline underline-offset-2">andrew@boldo.agency</a></div>
                  <div>Website: <a href="https://boldo.agency" target="_blank" rel="noreferrer" className="underline underline-offset-2">boldo.agency</a></div>
                  <div>Telegram: <span>@AndrewGeiger</span></div>
                </div>
              </div>

              <div className="rounded-3xl bg-white shadow-sm border border-black/5 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-black/70">
                      Имя
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black/10 rounded-xl bg-white/90 text-black placeholder:text-black/30 font-medium focus:outline-none focus:border-[--brand-600]/40"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-black/70">
                      Компания
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black/10 rounded-xl bg-white/90 text-black placeholder:text-black/30 font-medium focus:outline-none focus:border-[--brand-600]/40"
                      placeholder="Название компании"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-black/70">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black/10 rounded-xl bg-white/90 text-black placeholder:text-black/30 font-medium focus:outline-none focus:border-[--brand-600]/40"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-black/70">
                      Расскажите о проекте
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black/10 rounded-xl bg-white/90 text-black placeholder:text-black/30 font-medium focus:outline-none focus:border-[--brand-600]/40"
                      placeholder="Тип продукта, платформа, сроки, ожидаемый результат"
                    />
                  </div>
                  {submitStatus === 'success' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium">
                      ✓ Заявка отправлена! Мы свяжемся с вами в течение 24 часов.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                      ✕ {error || 'Ошибка при отправке. Попробуйте позже.'}
                    </div>
                  )}
                  <Button type="submit" disabled={isLoading} className="w-full font-semibold" size="lg">
                    {isLoading ? 'Отправляю...' : 'Отправить запрос на аудит'}
                  </Button>
                  <p className="text-xs text-black/45 font-medium text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Мы не передаем данные третьим лицам.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-[--page-bg] py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="text-xl font-semibold tracking-tight text-black">BOLDO</div>
              <div className="text-sm text-black/55 font-medium max-w-md">
                Reliable manual testing for video SaaS and social shopping projects.
              </div>
            </div>

            <nav className="flex flex-wrap gap-2 text-sm font-light">
              <Link
                href="#services"
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 backdrop-blur transition hover:border-black/15 hover:bg-white hover:text-black"
              >
                Услуги
              </Link>
              <Link
                href="#cases"
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 backdrop-blur transition hover:border-black/15 hover:bg-white hover:text-black"
              >
                Кейсы
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 backdrop-blur transition hover:border-black/15 hover:bg-white hover:text-black"
              >
                Контакты
              </Link>
            </nav>

          </div>
        </div>
      </footer>
    </div>
  );
}
