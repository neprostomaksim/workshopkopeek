"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

// Верхний sticky-хедер. Появляется по скроллу.
export default function StickyBars() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || window.pageYOffset || 0) > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "show" : ""}`}>
      <div className="header-bar glass">
        <div className="logo"><span className="lime mono">&lt;/&gt;</span> Вайб-кодинг</div>
        <div className="header-center mono">
          {site.eventDateLabel.replace(/^[А-Яа-яЁё]+,\s*/, "")} <span style={{ opacity: 0.4 }}>·</span>{" "}
          <b>{site.city}</b> <span style={{ opacity: 0.4 }}>·</span> {site.venue}
        </div>
        <a className="btn btn-primary" href={site.registerUrl} target="_blank" rel="noopener" style={{ padding: "11px 20px", fontSize: 15 }}>
          Занять место · {site.price}
        </a>
      </div>
    </header>
  );
}
