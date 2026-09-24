"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// ID пикселя публичен и в любом случае виден в коде страницы.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1415485604048699";

function trackPageView() {
  if (typeof window.fbq === "function") window.fbq("track", "PageView");
}

export default function MetaPixel() {
  const pathname = usePathname();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    if (!PIXEL_ID) return;

    if (!window.fbq) {
      const fbq = (window.fbq = function (...args) {
        fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
      });
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      fbq("init", PIXEL_ID);
    }

    const loadPixel = () => {
      if (document.getElementById("meta-pixel-script")) return;
      const script = document.createElement("script");
      script.id = "meta-pixel-script";
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    };

    let idleId;
    let scriptLoaded = false;
    const loadNow = () => {
      if (scriptLoaded) return;
      scriptLoaded = true;
      loadPixel();
    };
    const scheduleLoad = () => {
      idleId = window.setTimeout(loadNow, 4000);
    };

    if (document.readyState === "complete") scheduleLoad();
    else window.addEventListener("load", scheduleLoad, { once: true });
    window.addEventListener("pointerdown", loadNow, { once: true, passive: true });
    window.addEventListener("keydown", loadNow, { once: true });

    return () => {
      window.removeEventListener("load", scheduleLoad);
      window.removeEventListener("pointerdown", loadNow);
      window.removeEventListener("keydown", loadNow);
      if (idleId !== undefined) {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!PIXEL_ID || lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
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

  return null;
}
