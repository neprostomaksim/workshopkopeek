import Reveal from "../Reveal";
import { Icon } from "../icons";

const PAINS = [
  { time: "недели", icon: "cube", title: "Своя разработка", text: "ТЗ, подрядчик, правки по кругу — и всё равно получается не то.", cls: "pain-lg" },
  { time: "бюджет", icon: "shield", title: "Подрядчик под MVP", text: "Платить за то, что пока просто хочется попробовать.", cls: "pain-sm" },
  { time: "не то", icon: "grid", title: "Готовые сервисы", text: "Всегда чуть не под ваш процесс. Подстраиваетесь вы, а не они.", cls: "pain-sm" },
  { time: "потом", icon: "doc", title: "Идея в столе", text: "Собрать некому — откладывается на «когда-нибудь».", cls: "pain-lg" },
];

export default function Pain() {
  return (
    <section className="section">
      <div className="container">
        <Reveal style={{ maxWidth: 720, margin: "0 0 56px" }}>
          <p className="eyebrow">Знакомая ситуация</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Нужен простой инструмент —<br />а собрать некому</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Готовые сервисы не под ваш процесс, а своя разработка — это ТЗ, подрядчик, бюджет и недели
            ожидания.
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
              А ведь рабочий инструмент можно собрать <span className="lime">за один вечер</span> — своими руками
            </div>
            <p className="dim" style={{ fontSize: 16, maxWidth: 320 }}>
              Именно этим займёмся на интенсиве.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
