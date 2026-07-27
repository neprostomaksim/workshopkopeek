"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

// Верхний sticky-хедер + нижний мобильный бар. Появляются по скроллу.
export default function StickyBars() {
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled(y > 80);
      setHeroPassed(y > 460);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "show" : ""}`}>
        <div className="header-bar glass">
          <div className="logo"><span className="lime">ИИ</span> Воркшоп</div>
          <div className="header-center mono">
            {site.eventDateLabel.replace("Пятница, ", "")} <span style={{ opacity: 0.4 }}>·</span>{" "}
            <b>{site.city}</b> <span style={{ opacity: 0.4 }}>·</span> {site.venue}
          </div>
          <a className="btn btn-primary" href={site.paymentUrl} style={{ padding: "11px 20px", fontSize: 15 }}>
            Занять место · {site.price}
          </a>
        </div>
      </header>

      <div className={`mobile-bar glass ${heroPassed ? "show" : ""}`}>
        <span className="mono" style={{ fontWeight: 700, fontSize: 18 }}>{site.price}</span>
        <a className="btn btn-primary" href={site.paymentUrl} style={{ padding: "12px 22px", fontSize: 15 }}>
          Занять место
        </a>
      </div>
    </>
  );
}
