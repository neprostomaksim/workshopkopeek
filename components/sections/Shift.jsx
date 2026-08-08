import Reveal from "../Reveal";

// Логотипы основных нейросетей — рассыпаны по краям панели (хаотично, но по сетке отступов).
const LOGOS = [
  { src: "/ai/claude.png", alt: "Claude", style: { top: "13%", left: "5%", transform: "rotate(-8deg)" }, d: "0s" },
  { src: "/ai/antigravity.png", alt: "Antigravity", style: { top: "45%", left: "2.5%", transform: "rotate(5deg)" }, d: "1.1s" },
  { src: "/ai/cursor.png", alt: "Cursor", style: { top: "73%", left: "9%", transform: "rotate(-6deg)" }, d: "2.2s" },
  { src: "/ai/chatgpt.png", alt: "ChatGPT", style: { top: "17%", right: "6%", transform: "rotate(9deg)" }, d: "0.6s" },
  { src: "/ai/codex.png", alt: "Codex", style: { top: "67%", right: "7.5%", transform: "rotate(-5deg)" }, d: "1.7s" },
];

export default function Shift() {
  return (
    <section className="section-flush">
      <div className="panel panel-blue">
        <div className="ai-scatter" aria-hidden="true">
          {LOGOS.map((l) => (
            <span key={l.alt} className="ai-logo" style={{ ...l.style, animationDelay: l.d }}>
              <img src={l.src} alt="" />
            </span>
          ))}
        </div>

        <div className="container narrow center">
          <Reveal><p className="eyebrow" style={{ justifyContent: "center" }}>Что изменилось</p></Reveal>
          <Reveal as="h2" className="h2" style={{ marginTop: 20 }}>
            Уметь писать код<br />больше не обязательно
          </Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 24 }}>
            То, что раньше стоило денег и недель разработки, сегодня не-программист собирает сам.
            Вы ставите задачу словами — код пишет ИИ-агент.
          </Reveal>
          <Reveal
            className="glass-strong"
            style={{ marginTop: 40, textAlign: "left", padding: "28px 32px", borderLeft: "3px solid var(--lime)", borderRadius: 20 }}
          >
            <p style={{ fontSize: 18, lineHeight: 1.6 }}>
              Этот подход называют <span className="lime">вайб-кодингом</span>: вы управляете агентом, а не
              синтаксисом. Наводите, проверяете, уточняете — продукт собирается на глазах.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
