import Reveal from "../Reveal";
import { Icon } from "../icons";
import { site } from "@/lib/config";

export default function Pricing() {
  const taken = site.seatsTotal - site.seatsLeft;
  const pct = Math.round((taken / site.seatsTotal) * 100);

  const rows = [
    { icon: "calendar", text: site.eventDateLabel },
    { icon: "clock", text: site.eventTimeLabel },
    { icon: "pin", text: `${site.venue}, ${site.city}` },
    { icon: "users", text: "Небольшая группа" },
  ];

  return (
    <section className="section" style={{ overflow: "hidden" }} id="price">
      <div
        className="glow"
        style={{
          width: 560, height: 560, top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle,rgba(198,244,50,0.45),transparent 70%)",
        }}
      />
      <div className="container">
        <Reveal className="price-card glass-strong">
          <div className="badge badge-amber">
            <span className="pulse-dot" style={{ width: 7, height: 7 }} />
            Осталось {site.seatsLeft} места из {site.seatsTotal}
          </div>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,34px)", margin: "22px 0 24px" }}>
            Воркшоп «Собери своего ИИ-агента»
          </h2>

          <div>
            {rows.map((r) => (
              <div className="detail-row" key={r.text}>
                <Icon name={r.icon} />
                <span>{r.text}</span>
              </div>
            ))}
          </div>

          <div className="seats">
            <div className="seats-head">
              <span>Занято мест</span>
              <span><b>{taken}</b> / {site.seatsTotal}</span>
            </div>
            <div className="seats-track">
              <div className="seats-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="divider" />
          <div className="price-num mono">{site.price}</div>

          <a
            className="btn btn-primary"
            href={site.paymentUrl}
            target="_blank"
            rel="noopener"
            style={{ width: "100%", marginTop: 26, fontSize: 17, padding: 17 }}
          >
            Оплатить и занять место
          </a>
          <p className="dim center" style={{ fontSize: 14, marginTop: 16 }}>
            После оплаты я свяжусь с вами и пришлю детали.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
