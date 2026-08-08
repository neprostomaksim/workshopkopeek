import Reveal from "../Reveal";
import { Icon } from "../icons";

const CARDS = [
  {
    icon: "code",
    title: "Навык вайб-кодинга",
    text: "Как ставить задачу ИИ-агенту, чтобы он собрал за вас рабочий продукт.",
  },
  {
    icon: "board",
    title: "Готовая мини-CRM",
    text: "Работающая, собранная вашими руками прямо на интенсиве.",
  },
  {
    icon: "blueprint",
    title: "План и промпты вашего продукта",
    text: "Спроектированного с агентом-архитектором — готового собрать дома по шагам.",
  },
];

export default function Takeaways() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 56px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Что вы унесёте</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Уходите не с конспектом, а с продуктом</h2>
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
