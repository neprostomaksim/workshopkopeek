"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ID пикселя публичен и в любом случае виден в коде страницы.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1415485604048699";

function trackPageView() {
  if (typeof window.fbq === "function") window.fbq("track", "PageView");
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || window.fbq) return;

    const fbq = (window.fbq = function (...args) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
    });
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    fbq("init", PIXEL_ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  useEffect(() => {
    if (!PIXEL_ID) return;
    trackPageView();
  }, [pathname]);

  useEffect(() => {
    if (!PIXEL_ID) return;

    const onClick = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link?.href.includes("t.me/nempl_workshop_kop_bot")) return;
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", { contact_method: "telegram" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
