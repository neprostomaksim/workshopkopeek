import Reveal from "../Reveal";
import { Icon } from "../icons";

const CARDS = [
  { icon: "laptop", title: "Приходите с ноутбуком", text: "Всё делаем в живую, на вашем экране. Уходите с готовыми, настроенными агентами." },
  { icon: "target", title: "И с одной задачей", text: "Той, что съедает больше всего времени. С неё и начнём — на вашем реальном примере." },
  { icon: "code", title: "Кода не будет", text: "Ни строчки. Всё настраивается словами, на русском языке." },
];

export default function Format() {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 56px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Формат</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Это практика, а не лекция</h2>
        </Reveal>

        <div className="grid-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} className="how-card glass" delay={i * 0.08}>
              <div className="icon-badge"><Icon name={c.icon} /></div>
              <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.02em" }}>{c.title}</h3>
              <p className="dim" style={{ fontSize: 16 }}>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
