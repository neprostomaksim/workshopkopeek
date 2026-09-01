"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import { site } from "@/lib/config";

const FAQS = [
  {
    q: "Нужны ли навыки программирования?",
    a: "Нет. Код пишет ИИ-агент — вы ставите задачу словами и управляете. Если умеете пользоваться браузером и почтой — справитесь.",
  },
  {
    q: "Что нужно устанавливать перед воркшопом?",
    a: "Да, есть небольшой список инструментов для подготовки перед воркшопом. Вся информация будет выслана после записи на воркшоп.",
  },
  {
    q: "Инструменты платные?",
    a: (
      <>
        Начать можно бесплатно. Для полноценного погружения лучше заранее приобрести{" "}
        <a href={site.cursorUrl} target="_blank" rel="noopener">
          Cursor
        </a>{" "}
        — есть возможность оплаты с белорусской карты. А ещё на воркшопе можно
        использовать любые нейросети — включая Claude и ChatGPT, — если у вас есть платные доступы к ним.
      </>
    ),
  },
  {
    q: "Какой продукт соберём?",
    a: "Мы будем создавать рабочую мини-CRM: доска клиентов и сделок со статусами, карточки, перетаскивание. Продукт выбран как подходящий для понимания работы вайб-кодинга — чтобы вы ушли с навыком и пониманием, а также могли создавать свои продукты.",
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
