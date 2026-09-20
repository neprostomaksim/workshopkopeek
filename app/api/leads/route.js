import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { workshops } from "@/lib/workshops";

export const runtime = "nodejs";

const BOT_URL = "https://t.me/nempl_workshop_kop_bot";
const PHONE_PATTERN = /^[+\d()\s.-]{9,30}$/;

function sha256(value) {
  return createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

function normalizePhone(value) {
  const digits = String(value).replace(/\D/g, "");
  if (digits.length === 9) return `375${digits}`;
  if (digits.length === 11 && digits.startsWith("80")) return `375${digits.slice(2)}`;
  return digits;
}

function clean(value, maxLength = 160) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function sendMetaLead({ name, phone, workshop, eventId, fbp, fbc, request }) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  if (!pixelId || !token) return;

  const version = process.env.META_GRAPH_API_VERSION
    ? `${process.env.META_GRAPH_API_VERSION.replace(/^\/+|\/+$/g, "")}/`
    : "";
  const endpoint = new URL(`https://graph.facebook.com/${version}${pixelId}/events`);
  endpoint.searchParams.set("access_token", token);
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: process.env.META_EVENT_SOURCE_URL || request.headers.get("origin") || undefined,
    user_data: {
      ph: [sha256(normalizePhone(phone))],
      fn: [sha256(name)],
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      client_ip_address: clientIp || undefined,
      client_user_agent: request.headers.get("user-agent") || undefined,
    },
    custom_data: {
      content_name: `${workshop.title} · ${workshop.date}`,
      content_category: "workshop",
      currency: "BYN",
      value: 130,
    },
  };

  try {
    const body = { data: [event] };
    if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.error("Meta CAPI website Lead error:", response.status);
  } catch (error) {
    console.error("Meta CAPI website Lead request error:", error.message || error);
  }
}

export async function POST(request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Lead API is missing Supabase server credentials.");
    return NextResponse.json({ error: "Форма временно недоступна. Попробуйте позже." }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные формы." }, { status: 400 });
  }

  const name = clean(payload.name, 100);
  const phone = clean(payload.phone, 30);
  const workshop = workshops.find((item) => item.id === payload.workshopId);
  const eventId = clean(payload.eventId, 100) || randomUUID();
  if (name.length < 2 || !PHONE_PATTERN.test(phone) || !workshop) {
    return NextResponse.json({ error: "Проверьте имя, телефон и выбранный воркшоп." }, { status: 400 });
  }

  const token = `lead_${randomUUID().replace(/-/g, "")}`;
  const source = `${workshop.title} · ${workshop.date}`;
  const lead = {
    name,
    phone,
    source,
    workshop_id: workshop.id,
    registration_token: token,
    status: "new",
    utm_source: clean(payload.utm_source),
    utm_medium: clean(payload.utm_medium),
    utm_campaign: clean(payload.utm_campaign),
    utm_content: clean(payload.utm_content),
    meta_event_id: eventId,
  };

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/workshop_leads`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!response.ok) {
    console.error("Supabase website lead insert error:", response.status, (await response.text()).slice(0, 500));
    return NextResponse.json({ error: "Не удалось сохранить заявку. Попробуйте ещё раз." }, { status: 502 });
  }

  await sendMetaLead({
    name,
    phone,
    workshop,
    eventId,
    fbp: clean(payload.fbp, 250),
    fbc: clean(payload.fbc, 300),
    request,
  });

  return NextResponse.json({ telegramUrl: `${BOT_URL}?start=${token}` });
}
