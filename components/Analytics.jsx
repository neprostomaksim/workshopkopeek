"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Лёгкий счётчик визитов: шлёт событие в сборщик платформы при каждой
// загрузке/смене страницы. Не мешает сайту (ошибки глушатся), без cookies —
// уникальность по случайному id в localStorage.
const ENDPOINT = "https://smm-command.vercel.app/api/track";

export default function Analytics({ site }) {
  const pathname = usePathname();
  useEffect(() => {
    try {
      let vid = localStorage.getItem("vid");
      if (!vid) {
        vid =
          (typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2)) + Date.now().toString(36);
        localStorage.setItem("vid", vid);
      }
      const p = new URLSearchParams(location.search);
      const payload = JSON.stringify({
        site,
        path: pathname || location.pathname,
        ref: document.referrer || null,
        source: p.get("utm_source") || p.get("ref") || null,
        vid,
      });
      const blob = new Blob([payload], { type: "text/plain" });
      if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, blob);
      else fetch(ENDPOINT, { method: "POST", body: payload, keepalive: true });
    } catch {
      /* аналитика не должна мешать сайту */
    }
  }, [site, pathname]);
  return null;
}
