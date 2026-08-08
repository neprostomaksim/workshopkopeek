// Единая точка правок контента лендинга.
// Меняете здесь — меняется на всём сайте.

export const site = {
  // Дата и время начала воркшопа (ISO, локальное время Минска).
  // Используется для обратного отсчёта в hero.
  eventISO: "2026-08-24T16:00:00+03:00",
  eventDateLabel: "Понедельник, 24 августа",
  eventTimeLabel: "16:00–19:00 · 3 часа",
  city: "Минск",
  venue: "Пространство «Молоко»",

  price: "95 BYN",

  // Места: seatsLeft из seatsTotal — рисуют прогресс-бар и бейдж срочности.
  seatsTotal: 12,
  seatsLeft: 4,

  // Соц-доказательство.
  trainedCount: "350+",
  yearsTeaching: "5 лет",
  community: "Core M.AI.N",

  // Запись на воркшоп идёт через Telegram-бота (он собирает имя+телефон и пишет в Supabase).
  // ?start=vibecoding — метка лендинга (source) в таблице заявок.
  registerUrl: "https://t.me/nempl_workshop_kop_bot?start=vibecoding",

  // Ссылки. Замените "#" на реальные.
  paymentUrl: "#",
  telegramUrl: "https://t.me/neprostonewsai",
  contactUrl: "https://t.me/neprostonewsai",
  // Инструмент интенсива. Ставим и настраиваем вместе на месте.
  cursorUrl: "https://cursor.com",

  // Спикер и сообщество.
  speaker: {
    instagramUrl: "https://www.instagram.com/neprostomaksim?igsh=MWo1cnp4ZDd1cGRnZA==",
    telegramUrl: "https://t.me/neprostonewsai",
    mainUrl: "https://t.me/maincomby",
  },
};
