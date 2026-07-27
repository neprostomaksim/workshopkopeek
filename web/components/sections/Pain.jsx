import Reveal from "../Reveal";
import { Icon } from "../icons";

const PAINS = [
  { time: "~1 час", icon: "doc", title: "Коммерческое предложение", text: "Каждый раз под клиента, каждый раз с нуля.", cls: "pain-lg" },
  { time: "~1 час", icon: "shield", title: "Договор на проверку", text: "И то по диагонали — а потом ищешь, где подписал лишнего.", cls: "pain-sm" },
  { time: "полгода", icon: "regulation", title: "Регламент для нового сотрудника", text: "Лежит в голове. Всё никак не дойдут руки.", cls: "pain-sm" },
  { time: "до вечера", icon: "mail", title: "Письмо партнёру", text: "Написать надо аккуратно, поэтому откладывается.", cls: "pain-lg" },
];

export default function Pain() {
  return (
    <section className="section">
      <div className="container">
        <Reveal style={{ maxWidth: 720, margin: "0 0 56px" }}>
          <p className="eyebrow">Куда уходит время</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Знакомо?</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Каждая из этих задач по отдельности — ерунда. Вместе они съедают рабочую неделю.
          </p>
        </Reveal>

        <div className="bento">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} className={`pain-card glass ${p.cls}`} delay={i * 0.06}>
              <div className="pain-head">
                <div className="pain-ico"><Icon name={p.icon} /></div>
                <div className="time-tag mono">{p.time}</div>
              </div>
              <h3 className="pain-title">{p.title}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{p.text}</p>
            </Reveal>
          ))}

          <Reveal className="sum-card glass-strong" delay={0.24}>
            <div className="sum-big">
              А в сумме — <span className="lime">целая рабочая неделя</span> в месяц
            </div>
            <p className="dim" style={{ fontSize: 16, maxWidth: 320 }}>
              …которую можно вернуть себе. Именно этим займёмся на воркшопе.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
