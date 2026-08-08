"use client";

import { site } from "@/lib/config";
import Countdown from "./Countdown";
import Reveal from "./Reveal";
import ImageSlot from "./ImageSlot";

const AV = [
  { c: "var(--lime)", t: "М" },
  { c: "#7FB8FF", t: "А" },
  { c: "var(--amber)", t: "К" },
];

export default function Hero() {
  const scrollToProgram = () => {
    const el = document.getElementById("program");
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
          {site.eventDateLabel}, {site.eventTimeLabel.split(" · ")[0]} · {site.venue}, {site.city}
        </div>

        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Практический интенсив по вайб-кодингу
        </p>

        <h1 className="h1 hero-title">
          Свой продукт для бизнеса
          <br />
          <span className="lime">без разработчиков и кода</span>
        </h1>

        <p className="lead hero-lead">
          Нужен рабочий инструмент, а собрать некому? За 3 часа соберёте его сами — код пишет ИИ-агент,
          вы управляете словами. Уйдёте с готовой мини-CRM и навыком собирать что угодно под свои задачи.
        </p>

        <Countdown iso={site.eventISO} />

        <div className="hero-btns">
          <a className="btn btn-primary" href={site.registerUrl} target="_blank" rel="noopener">
            Занять место — {site.price}
          </a>
          <button type="button" className="btn btn-secondary" onClick={scrollToProgram}>
            Программа интенсива
          </button>
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
            <b>{site.trainedCount} человек</b> уже прошли обучение · осталось{" "}
            <b style={{ color: "var(--amber)" }}>{site.seatsLeft} места</b> из {site.seatsTotal}
          </span>
        </div>

        <Reveal style={{ width: "100%" }} delay={0.05}>
          <div className="scene glass-strong shot-frame">
            <div className="scene-bar">
              <span className="scene-dot" />
              <span className="scene-dot" />
              <span className="scene-dot" />
              <span className="scene-url mono">моя-crm · собрано на интенсиве</span>
            </div>
            <ImageSlot
              label="Скриншот вашей мини-CRM — вставьте после интенсива"
              style={{ width: "100%", aspectRatio: "16 / 9" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
