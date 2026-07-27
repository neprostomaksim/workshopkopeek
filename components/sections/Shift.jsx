import Reveal from "../Reveal";

export default function Shift() {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container narrow center">
        <Reveal><p className="eyebrow" style={{ justifyContent: "center" }}>Главный сдвиг последних двух лет</p></Reveal>
        <Reveal as="h2" className="h2" style={{ marginTop: 20 }}>
          ИИ перестал быть<br />умным поисковиком
        </Reveal>
        <Reveal as="p" className="lead" style={{ marginTop: 24 }}>
          Он стал ассистентом, который всегда на связи. У него нет выходных, он не уходит в отпуск и
          не просит объяснить задачу дважды. Вы формулируете, что нужно, — он делает.
        </Reveal>
        <Reveal
          className="glass-strong"
          style={{ marginTop: 40, textAlign: "left", padding: "28px 32px", borderLeft: "3px solid var(--lime)", borderRadius: 20 }}
        >
          <p style={{ fontSize: 18, lineHeight: 1.6 }}>
            Такого ассистента, настроенного под конкретную задачу, называют <span className="lime">агентом</span>.
            И завести их можно сразу несколько — под разные участки работы.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
