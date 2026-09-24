const YANDEX_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "112832087";

// Единая точка отправки событий воронки. В properties нельзя передавать
// имя, телефон, Telegram username и другие персональные данные.
export function trackMarketingEvent(eventName, properties = {}, options = {}) {
  if (typeof window === "undefined") return;

  const payload = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );

  try {
    window.gtag?.("event", eventName, payload);
  } catch {}

  try {
    if (YANDEX_ID) window.ym?.(Number(YANDEX_ID), "reachGoal", eventName, payload);
  } catch {}

  try {
    if (options.meta !== false) window.fbq?.("trackCustom", eventName, payload);
  } catch {}
}
