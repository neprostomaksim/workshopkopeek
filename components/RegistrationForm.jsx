"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { workshops } from "@/lib/workshops";
import { site } from "@/lib/config";
import { trackMarketingEvent } from "@/lib/marketingAnalytics";

const PRIMARY_WORKSHOP_ID = "ai-agents-29-09";

function readCookie(name) {
  const encodedName = `${encodeURIComponent(name)}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedName))
    ?.slice(encodedName.length);
}

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  const fbc = readCookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : "");

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    fbp: readCookie("_fbp") || "",
    fbc,
    eventSourceUrl: window.location.href,
  };
}

export default function RegistrationForm() {
  const formRef = useRef(null);
  const formStarted = useRef(false);
  const [workshopId, setWorkshopId] = useState(PRIMARY_WORKSHOP_ID);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const workshop = useMemo(
    () => workshops.find((item) => item.id === workshopId) || workshops[0],
    [workshopId]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("workshop");
    if (workshops.some((item) => item.id === fromUrl)) setWorkshopId(fromUrl);

    const selectWorkshop = (event) => {
      if (workshops.some((item) => item.id === event.detail)) setWorkshopId(event.detail);
    };
    window.addEventListener("workshop:choose", selectWorkshop);
    return () => window.removeEventListener("workshop:choose", selectWorkshop);
  }, []);

  useEffect(() => {
    if (!formRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      trackMarketingEvent("form_viewed", { form_id: "workshop_registration" });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  function markFormStarted() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackMarketingEvent("form_started", {
      form_id: "workshop_registration",
      workshop_id: workshop.id,
    });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const attribution = getAttribution();
    trackMarketingEvent("form_submit_attempted", {
      form_id: "workshop_registration",
      workshop_id: workshop.id,
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
    });

    const eventId = window.crypto?.randomUUID?.() || `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          workshopId: workshop.id,
          eventId,
          ...attribution,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не удалось сохранить заявку.");

      window.fbq?.(
        "track",
        "Lead",
        {
          content_name: `${workshop.title} · ${workshop.date}`,
          content_category: "workshop",
          currency: "BYN",
          value: Number.parseInt(site.price, 10) || undefined,
        },
        { eventID: eventId }
      );

      trackMarketingEvent("lead_created", {
        form_id: "workshop_registration",
        workshop_id: workshop.id,
        utm_source: attribution.utm_source,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
      }, { meta: false });
      trackMarketingEvent("telegram_handoff_started", {
        workshop_id: workshop.id,
      });

      window.location.assign(result.telegramUrl);
    } catch (submitError) {
      trackMarketingEvent("form_submit_failed", {
        form_id: "workshop_registration",
        workshop_id: workshop.id,
        error_type: "request_failed",
      });
      setError(submitError.message || "Не удалось отправить форму. Попробуйте ещё раз.");
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className="lead-form" id="register" onSubmit={submit} onInput={markFormStarted}>
      <p className="lead-form-intro">
        Оставьте контакты — в Telegram подтвердим запись и пришлём ссылку на оплату.
      </p>
      <label className="lead-field">
        <span>Воркшоп</span>
        <select value={workshop.id} onChange={(event) => setWorkshopId(event.target.value)}>
          {workshops.map((item) => (
            <option key={item.id} value={item.id}>
              {item.date} · {item.title}
            </option>
          ))}
        </select>
      </label>
      <label className="lead-field">
        <span>Ваше имя</span>
        <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" minLength="2" required />
      </label>
      <label className="lead-field">
        <span>Телефон</span>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="+375 29 123-45-67" minLength="9" required />
      </label>
      <label className="lead-consent">
        <input type="checkbox" required />
        <span>Согласен на обработку данных для записи и связь по заявке.</span>
      </label>
      {error && <p className="lead-form-error" role="alert">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={isSubmitting} style={{ width: "100%", marginTop: 22, fontSize: 17, padding: 17 }}>
        {isSubmitting ? "Сохраняем заявку…" : "Оставить заявку"}
      </button>
      <p className="dim center" style={{ fontSize: 14, marginTop: 16 }}>
        Данные вводятся один раз: в Telegram повторно спрашивать их не будем.
      </p>
    </form>
  );
}
