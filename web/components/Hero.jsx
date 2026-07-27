"use client";

import { site } from "@/lib/config";
import Countdown from "./Countdown";
import AgentScene from "./AgentScene";
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

        <h1 className="h1 hero-title">
          У предпринимателя всегда не хватает
          <br />
          одного — <span className="lime">времени</span>
        </h1>

        <p className="lead hero-lead">
          За три часа вы соберёте себе команду ИИ-агентов, которые заберут рутину. Руками, на своём
          ноутбуке. Без единой строчки кода.
        </p>

        <Countdown iso={site.eventISO} />

        <div className="hero-btns">
          <a className="btn btn-primary" href={site.paymentUrl}>
            Занять место — {site.price}
          </a>
          <button type="button" className="btn btn-secondary" onClick={scrollToProgram}>
            Что будет на воркшопе
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

        <Reveal style={{ width: "100%" }}>
          <AgentScene />
        </Reveal>

        <Reveal style={{ width: "100%" }} delay={0.1}>
          <div className="scene glass-strong shot-frame">
            <div className="scene-bar">
              <span className="scene-dot" />
              <span className="scene-dot" />
              <span className="scene-dot" />
              <span className="scene-url mono">ваш экран · после воркшопа</span>
            </div>
            <ImageSlot
              label="Скриншот вашего рабочего стола с агентами — вставьте после воркшопа"
              style={{ width: "100%", aspectRatio: "16 / 9" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
