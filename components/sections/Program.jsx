import Reveal from "../Reveal";
import { Icon } from "../icons";

const STEPS = [
  {
    num: "01",
    tile: "N",
    name: "NotebookLM",
    text: "Агент, который работает на ваших данных. Загружаете договоры, регламенты, записи созвонов, базу знаний — и получаете собеседника, который знает вашу компанию и отвечает по вашим документам.",
  },
  {
    num: "02",
    tile: "G",
    name: "Gem-боты в Gemini",
    text: "Собственные агенты с доступом в интернет. Найти информацию по рынку, посмотреть, что у конкурентов, собрать аналитику к решению. Настроили один раз — пользуетесь каждый день.",
  },
  {
    num: "03",
    icon: "grid",
    name: "Агенты под функции",
    text: "Маркетинг, копирайтинг, менеджмент. Коммерческое предложение, пост, письмо, регламент — под ваши процессы, а не «универсальный помощник».",
  },
  {
    num: "04",
    icon: "cube",
    name: "Принцип сборки",
    text: "Тот самый метод, по которому вы дальше соберёте агента под любую задачу в бизнесе — сами, без меня.",
  },
];

export default function Program() {
  return (
    <section className="section" id="program">
      <div className="container">
        <Reveal style={{ maxWidth: 760, margin: "0 0 56px" }}>
          <p className="eyebrow">За три часа</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Что вы соберёте своими руками</h2>
        </Reveal>

        <div className="prog-stack">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} className="prog-card glass" delay={i * 0.06}>
              <span className="prog-ghost">{s.num}</span>
              <div className="prog-left">
                <div className="tile">
                  {s.icon ? <Icon name={s.icon} className="ico" style={{ width: 26, height: 26 }} /> : s.tile}
                </div>
                <div>
                  <div className="prog-num mono">{s.num}</div>
                  <div className="prog-name">{s.name}</div>
                </div>
              </div>
              <p className="dim" style={{ fontSize: 17 }}>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
