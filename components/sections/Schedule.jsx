"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import { workshops } from "@/lib/workshops";
import { site } from "@/lib/config";

export default function Schedule() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="schedule">
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 56px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Расписание</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Цикл воркшопов по нейросетям</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Минск, Пространство «Молоко». Нажмите на карточку — раскроется подробнее.
          </p>
        </Reveal>

        <div className="sched-grid">
          {workshops.map((w, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={w.id} className={`sched-card glass ${isOpen ? "open" : ""}`} delay={i * 0.06}>
                <button
                  type="button"
                  className="sched-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="sched-date mono">
                    {w.date}
                    <span className="sched-wd">{w.weekday}</span>
                  </span>
                  <h3 className="sched-title">{w.title}</h3>
                  <p className="sched-tagline">{w.tagline}</p>
                  <span className="sched-more">
                    {isOpen ? "Свернуть" : "Подробнее"}
                    <span className={`sched-plus ${isOpen ? "open" : ""}`} />
                  </span>
                </button>

                <div className={`sched-body ${isOpen ? "open" : ""}`}>
                  <div>
                    <div className="sched-inner">
                      <p className="sched-desc">{w.desc}</p>
                      <a
                        className="btn btn-primary"
                        href={site.registerUrl}
                        target="_blank"
                        rel="noopener"
                        style={{ marginTop: 18, width: "100%" }}
                      >
                        Записаться
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
