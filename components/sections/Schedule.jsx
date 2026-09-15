"use client";

import { useState, useEffect } from "react";
import Reveal from "../Reveal";
import { workshops } from "@/lib/workshops";
import { site } from "@/lib/config";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function Schedule() {
  const [active, setActive] = useState(null);
  const w = active != null ? workshops[active] : null;

  useEffect(() => {
    if (active == null) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="section" id="schedule">
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 56px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Расписание</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Цикл воркшопов по нейросетям</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Минск, Пространство «Молоко». Нажмите на карточку — откроются подробности.
          </p>
        </Reveal>

        <div className="sched-grid">
          {workshops.map((wk, i) => (
            <Reveal
              key={wk.id}
              as="button"
              className="sched-card glass"
              delay={i * 0.05}
              onClick={() => setActive(i)}
              aria-label={`${wk.title} — ${wk.date}`}
            >
              <span className="sched-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="sched-date-badge mono">
                {wk.date}
                <span>{wk.weekday}</span>
              </span>
              <h3 className="sched-title">{wk.title}</h3>
              <p className="sched-tagline">{wk.tagline}</p>
              <span className="sched-more">
                Подробнее <Arrow />
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      {w && (
        <div className="sched-modal" onClick={() => setActive(null)}>
          <div
            className="sched-dialog glass-strong"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="sched-close" onClick={() => setActive(null)} aria-label="Закрыть">
              ✕
            </button>
            <span className="sched-date-badge mono">
              {w.date}
              <span>{w.weekday}</span>
            </span>
            <h3 className="sched-dialog-title">{w.title}</h3>
            <p className="sched-dialog-tagline">{w.tagline}</p>
            <p className="sched-desc">{w.desc}</p>
            <a
              className="btn btn-primary"
              href={site.registerUrl}
              target="_blank"
              rel="noopener"
              style={{ marginTop: 26, width: "100%" }}
            >
              Записаться
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
