import Reveal from "../Reveal";

const STEPS = [
  {
    num: "01",
    start: "13:30",
    end: "13:45",
    name: "Что такое вайб-кодинг",
    text: "Показываю живьём продукт, который вы соберёте сами уже сегодня. Разбираемся, почему собрать его теперь можно без разработчиков.",
  },
  {
    num: "02",
    start: "13:45",
    end: "14:10",
    name: "Настраиваем инструмент",
    text: "Ставим рабочий инструмент (Cursor) и делаем первый запуск все вместе. С этого момента ваш ноутбук готов к работе.",
  },
  {
    num: "03",
    start: "14:10",
    end: "15:40",
    name: "Собираем мини-CRM",
    text: "Главная часть. Шаг за шагом: доска клиентов и сделок со статусами, карточки, перетаскивание. Показываю → делаем синхронно → пробуете сами. Внутри — короткая кофе-пауза ☕.",
    main: true,
  },
  {
    num: "04",
    start: "15:40",
    end: "16:15",
    name: "Проектируем ваш продукт",
    text: "С агентом-архитектором продумываем ваш продукт: суть, функции, экраны, данные. Уходите с готовым планом и промптами.",
  },
  {
    num: "05",
    start: "16:15",
    end: "16:30",
    name: "Итоги",
    text: "Ключевые выводы, алгоритм «как продолжать самому» и набор промптов в подарок.",
  },
];

export default function Program() {
  return (
    <section className="section" id="program">
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 64px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Программа · 3 часа · старт 13:30</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Как пройдёт интенсив</h2>
        </Reveal>

        <div className="timeline">
          {STEPS.map((s, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <Reveal
                key={s.num}
                className={`tl-item tl-${side} from-${side}`}
                delay={0.05}
              >
                <span className="tl-node" />
                <div className={`tl-card glass ${s.main ? "prog-main" : ""}`.trim()}>
                  <div className="tl-time mono">{s.start} – {s.end}</div>
                  {s.main && <span className="prog-tag">Главный блок</span>}
                  <div className="tl-head">
                    <span className="tl-num mono">{s.num}</span>
                    <h3 className="tl-name">{s.name}</h3>
                  </div>
                  <p className="dim tl-text">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
