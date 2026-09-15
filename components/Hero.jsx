"use client";

import { site } from "@/lib/config";

const AV = [
  { c: "var(--lime)", t: "М" },
  { c: "#7FB8FF", t: "А" },
  { c: "var(--amber)", t: "К" },
];

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + (window.scrollY || 0) - 72,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="hero-bg-wrap">
        <img src="/hero-bg.jpg" alt="Атмосфера воркшопа" className="hero-bg-img" />
        <div className="hero-bg-overlay" />
        <div className="grid-bg hero-grid" />
      </div>

      <div
        className="glow"
        style={{
          width: 640,
          height: 640,
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle,rgba(198,244,50,0.5),transparent 70%)",
          animation: "glowPulse 7s ease-in-out infinite",
        }}
      />
      <div
        className="glow"
        style={{
          width: 560,
          height: 560,
          bottom: -180,
          left: "6%",
          background: "radial-gradient(circle,rgba(70,110,180,0.45),transparent 70%)",
          opacity: 0.3,
        }}
      />

      <div className="container center hero-inner">
        <div className="pill glass">
          <span className="pulse-dot" />
          Сентябрь–октябрь · {site.venue}, {site.city}
        </div>

        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Практические воркшопы по ИИ для бизнеса
        </p>

        <h1 className="h1 hero-title">
          Нейросети для бизнеса —
          <br />
          <span className="lime">руками, за один вечер</span>
        </h1>

        <p className="lead hero-lead">
          Цикл из четырёх практических воркшопов: ИИ-агенты, вайб-кодинг и ИИ-менеджер. Без кода, на
          ваших реальных задачах — уходите не с теорией, а с готовым результатом.
        </p>

        <div className="hero-btns">
          <button type="button" className="btn btn-primary" onClick={() => scrollTo("schedule")}>
            Смотреть расписание
          </button>
          <a className="btn btn-secondary" href={site.registerUrl} target="_blank" rel="noopener">
            Записаться
          </a>
        </div>

        <div className="proof glass">
          <div className="avatars">
            {AV.map((a, i) => (
              <span key={i} className="avatar" style={{ background: a.c }}>
                {a.t}
              </span>
            ))}
          </div>
          <span className="proof-text">
            <b>{site.trainedCount} человек</b> уже прошли обучение у Максима Леонова
          </span>
        </div>
      </div>
    </section>
  );
}
