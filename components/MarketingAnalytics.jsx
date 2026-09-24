"use client";

import { useEffect } from "react";
import { trackMarketingEvent } from "@/lib/marketingAnalytics";

const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-ZZQZHVHXW4";
const YANDEX_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "112832087";

export default function MarketingAnalytics() {
  useEffect(() => {
    if (GOOGLE_ID) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", GOOGLE_ID, { anonymize_ip: true });
    }

    if (YANDEX_ID) {
      window.ym = window.ym || function ym() { (window.ym.a = window.ym.a || []).push(arguments); };
      window.ym.l = window.ym.l || Date.now();
      window.ym(Number(YANDEX_ID), "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    }

    const loadScript = (id, src) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.async = true;
      script.src = src;
      document.head.appendChild(script);
    };

    const loadAnalytics = () => {
      if (GOOGLE_ID) loadScript("google-analytics-script", `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ID}`);
      if (YANDEX_ID) loadScript("yandex-metrika-script", "https://mc.yandex.ru/metrika/tag.js");
    };

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(loadAnalytics, { timeout: 2500 })
      : window.setTimeout(loadAnalytics, 1800);

    const trackClick = (event) => {
      const target = event.target.closest?.("[data-analytics-event], a[href]");
      if (!target) return;

      const isTelegram = target.matches('a[href*="t.me/nempl_workshop_kop_bot"]');
      const eventName = target.dataset.analyticsEvent || (isTelegram ? "telegram_registration_clicked" : "");
      if (!eventName) return;

      const properties = {
        method: isTelegram ? "telegram" : undefined,
        cta_text: target.textContent?.trim().replace(/\s+/g, " ").slice(0, 80),
        cta_location: target.dataset.analyticsLocation ||
          target.closest("section")?.id ||
          target.closest("header, footer")?.tagName.toLowerCase() ||
          "page",
        workshop_id: target.dataset.workshopId,
      };

      trackMarketingEvent(eventName, properties);
    };

    document.addEventListener("click", trackClick);
    return () => {
      document.removeEventListener("click", trackClick);
      if (window.cancelIdleCallback && typeof idleId === "number") window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return null;
}
