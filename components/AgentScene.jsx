import { Icon } from "./icons";

// Hero-визуал: стилизованный «рабочий стол» с карточками ИИ-агентов.
// Полностью на CSS/SVG — без внешних изображений.
const AGENTS = [
  { icon: "doc", name: "КП", lines: ["w90", "w70", "w50"], status: "done" },
  { icon: "shield", name: "Договор", lines: ["w70", "w90", "w40"], status: "run" },
  { icon: "mail", name: "Письмо", lines: ["w50", "w70", "w40"], status: "done" },
  { icon: "regulation", name: "Регламент", lines: ["w90", "w50", "w70"], status: "run" },
];

export default function AgentScene() {
  return (
    <div className="scene glass-strong">
      <div className="scene-bar">
        <span className="scene-dot" />
        <span className="scene-dot" />
        <span className="scene-dot" />
        <span className="scene-url mono">мои-агенты · рабочий стол</span>
        <span className="scene-live mono">
          <span className="pulse-dot" style={{ width: 7, height: 7 }} /> 4 агента онлайн
        </span>
      </div>
      <div className="scene-body">
        {AGENTS.map((a) => (
          <div className="agent" key={a.name}>
            <div className="agent-ico">
              <Icon name={a.icon} />
            </div>
            <div className="agent-name">{a.name}</div>
            <div className="agent-lines">
              {a.lines.map((w, i) => (
                <span key={i} className={`line ${i === 0 ? "fill" : ""} ${w}`} />
              ))}
              {a.status === "done" ? (
                <span className="agent-status tag-done">● готово</span>
              ) : (
                <span className="agent-status tag-run">
                  печатает
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
