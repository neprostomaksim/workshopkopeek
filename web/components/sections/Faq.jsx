"use client";

import { useState } from "react";
import Reveal from "../Reveal";

const FAQS = [
  { q: "Я совсем не разбираюсь в технологиях. Потяну?", a: "Да. Это главное условие формата: всё настраивается обычными словами, кода не будет. Если умеете пользоваться браузером и почтой — потянете." },
  { q: "Что нужно взять с собой?", a: "Ноутбук с зарядкой и одну рабочую задачу, которая отнимает больше всего времени. Всё остальное — на месте." },
  { q: "Инструменты платные?", a: "Разбираем те, которыми можно пользоваться бесплатно. Если понадобится платная версия — честно скажу, где и зачем." },
  { q: "Уйду с чем-то готовым или только с конспектом?", a: "С работающими агентами, настроенными под ваши задачи. Конспект — приятное дополнение." },
  { q: "Будет ли запись?", a: "Нет. Формат живой, всё внимание тем, кто в зале." },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 48px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Вопросы</p>
          <h2 className="h2" style={{ marginTop: 16 }}>Частые вопросы</h2>
        </Reveal>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} className="faq-item glass" delay={i * 0.04}>
                <button
                  type="button"
                  className="faq-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className={`faq-plus ${isOpen ? "open" : ""}`} />
                </button>
                <div className={`faq-body ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="faq-answer">{f.a}</p>
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
