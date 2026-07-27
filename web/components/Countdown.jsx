"use client";

import { useEffect, useState } from "react";

function diff(targetMs) {
  const total = Math.max(0, targetMs - Date.now());
  const days = Math.floor(total / 86400000);
  const hours = Math.floor((total % 86400000) / 3600000);
  const mins = Math.floor((total % 3600000) / 60000);
  const secs = Math.floor((total % 60000) / 1000);
  return { days, hours, mins, secs, done: total === 0 };
}

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown({ iso }) {
  // null до маунта, чтобы не было рассинхрона гидратации (сервер не знает Date.now()).
  const [t, setT] = useState(null);

  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => setT(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  const cells = t
    ? [
        { n: t.days, l: "дней" },
        { n: pad(t.hours), l: "часов" },
        { n: pad(t.mins), l: "минут" },
        { n: pad(t.secs), l: "секунд" },
      ]
    : [
        { n: "—", l: "дней" },
        { n: "—", l: "часов" },
        { n: "—", l: "минут" },
        { n: "—", l: "секунд" },
      ];

  if (t?.done) {
    return (
      <div className="pill glass" aria-live="polite">
        <span className="pulse-dot" /> Воркшоп уже идёт
      </div>
    );
  }

  return (
    <div className="countdown" aria-label="Обратный отсчёт до старта" suppressHydrationWarning>
      {cells.map((c, i) => (
        <div key={c.l} style={{ display: "flex" }}>
          <div className="cd-cell glass">
            <div className="cd-num mono" suppressHydrationWarning>{c.n}</div>
            <div className="cd-lbl">{c.l}</div>
          </div>
          {i < cells.length - 1 && <div className="cd-sep">:</div>}
        </div>
      ))}
    </div>
  );
}
