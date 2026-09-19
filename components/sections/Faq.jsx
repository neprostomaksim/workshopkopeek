"use client";

import { useState } from "react";
import Reveal from "../Reveal";

const FAQS = [
  {
    q: "Нужны ли навыки программирования?",
    a: "Нет. Код пишет ИИ-агент — вы ставите задачу словами и управляете. Если умеете пользоваться браузером и почтой — справитесь.",
  },
  {
    q: "Что нужно устанавливать перед воркшопом?",
    a: "Список инструментов зависит от выбранной темы. Вся информация будет выслана после записи на воркшоп.",
  },
  {
    q: "Инструменты платные?",
    a: "Все задания на воркшопе можно выполнить с бесплатными инструментами. Подписка на ChatGPT или Claude не обязательна, но будет преимуществом: с ней доступно больше возможностей и выше лимиты на работу с нейросетью.",
  },
  {
    q: "Что получится создать на воркшопе?",
    a: "Зависит от темы: на воркшопе по ИИ-агентам — помощников под ваши задачи, на вайб-кодинге — прототип продукта, на занятии по ИИ-менеджеру — бота для работы с клиентами. Подробности — в программе каждого воркшопа.",
  },
  {
    q: "Будет ли запись?",
    a: "Записи не будет, но вы получите бесплатный доступ к LMS-платформе со всеми знаниями, которые разбираем на интенсиве.",
  },
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
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className={`faq-plus ${isOpen ? "open" : ""}`} />
                </button>
                <div id={`faq-answer-${i}`} inert={isOpen ? undefined : ""} className={`faq-body ${isOpen ? "open" : ""}`}>
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
