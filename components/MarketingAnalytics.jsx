"use client";

import Script from "next/script";
import { useEffect } from "react";

const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const YANDEX_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export default function MarketingAnalytics() {
  useEffect(() => {
    if (!GOOGLE_ID && !YANDEX_ID) return;

    const trackTelegramClick = (event) => {
      const link = event.target.closest?.('a[href*="t.me/nempl_workshop_kop_bot"]');
      if (!link) return;

      const properties = {
        method: "telegram",
        cta_text: link.textContent?.trim().slice(0, 80) || "telegram",
        cta_location:
          link.closest("section")?.id ||
          link.closest("header, footer")?.tagName.toLowerCase() ||
          "page",
      };

      if (GOOGLE_ID && typeof window.gtag === "function") {
        window.gtag("event", "telegram_registration_clicked", properties);
      }
      if (YANDEX_ID && typeof window.ym === "function") {
        window.ym(Number(YANDEX_ID), "reachGoal", "telegram_registration_clicked", properties);
      }
    };

    document.addEventListener("click", trackTelegramClick);
    return () => document.removeEventListener("click", trackTelegramClick);
  }, []);

  return (
    <>
      {GOOGLE_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ID}');
            `}
          </Script>
        </>
      )}

      {YANDEX_ID && (
        <>
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;
              a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
              ym(${Number(YANDEX_ID)}, 'init', {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});
            `}
          </Script>
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${YANDEX_ID}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
    </>
  );
}
