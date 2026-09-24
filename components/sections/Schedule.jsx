"use client";

import { useState, useEffect, useRef } from "react";
import Reveal from "../Reveal";
import { workshops } from "@/lib/workshops";
import { site } from "@/lib/config";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

function findNextWorkshopId() {
  const now = Date.now();
  return workshops
    .filter((workshop) => new Date(workshop.startsAt).getTime() > now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0]?.id || null;
}

export default function Schedule() {
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);
  const [nextWorkshopId, setNextWorkshopId] = useState(null);
  const w = active != null ? workshops[active] : null;

  useEffect(() => {
    const updateNextWorkshop = () => setNextWorkshopId(findNextWorkshopId());
    updateNextWorkshop();
    const timer = window.setInterval(updateNextWorkshop, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (active == null) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialogRef.current?.querySelector("button")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll("button, a[href]");
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [active]);

  return (
    <section className="section" id="schedule">
      <div className="container">
        <Reveal className="section-heading">
          <p className="eyebrow" style={{ justifyContent: "center" }}>Расписание</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Один вечер. Новый навык.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Выберите задачу, которую хотите решить. На каждом воркшопе — практика и свой результат.
          </p>
        </Reveal>

        <div className="sched-grid">
          {workshops.map((wk, i) => {
            const isNearest = wk.id === nextWorkshopId;
            return (
              <Reveal
                key={wk.id}
                as="button"
                id={wk.id}
                className={`sched-card glass ${isNearest ? "is-nearest" : ""}`}
                type="button"
                delay={i * 0.05}
                onClick={() => setActive(i)}
                aria-label={`${wk.title} — ${wk.date}${isNearest ? " — ближайший воркшоп" : ""}`}
              >
                <span className="workshop-topline">
                  <span className="workshop-category mono">{wk.category}</span>
                  {isNearest && <span className="nearest-badge mono">Ближайший</span>}
                </span>
                <span className="sched-num mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="sched-date-badge mono">
                  {wk.date}
                  <span>{wk.weekday} · {wk.time}</span>
                </span>
                <h3 className="sched-title">{wk.title}</h3>
                <p className="sched-tagline">{wk.tagline}</p>
                <span className="sched-more">
                  Программа воркшопа <Arrow />
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>

      {w && (
        <div className="sched-modal" onClick={() => setActive(null)}>
          <div
            className="sched-dialog glass-strong"
            ref={dialogRef}
            role="dialog"
            aria-labelledby="workshop-title"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="sched-close" onClick={() => setActive(null)} aria-label="Закрыть">
              ✕
            </button>
            <span className="sched-date-badge mono">
              {w.date}
              <span>{w.weekday} · {w.time}</span>
            </span>
            <h3 id="workshop-title" className="sched-dialog-title">{w.title}</h3>
            <p className="sched-dialog-tagline">{w.tagline}</p>
            <p className="sched-desc">{w.desc}</p>
            <a
              className="btn btn-primary"
              href="#register"
              data-analytics-event="cta_clicked"
              data-analytics-location="schedule_modal"
              data-workshop-id={w.id}
              style={{ marginTop: 26, width: "100%" }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("workshop:choose", { detail: w.id }));
                setActive(null);
              }}
            >
              Выбрать и записаться
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
