// Единая точка правок контента лендинга.
// Меняете здесь — меняется на всём сайте.

export const site = {
  // Дата и время начала воркшопа (ISO, локальное время Минска).
  // Используется для обратного отсчёта в hero.
  eventISO: "2026-09-29T18:30:00+03:00",
  eventDateLabel: "Вторник, 29 сентября",
  eventTimeLabel: "18:30–21:30 · 3 часа",
  city: "Минск",
  venue: "Пространство «Молоко»",

  price: "130 BYN",

  // Места: seatsLeft из seatsTotal — рисуют прогресс-бар и бейдж срочности.
  seatsTotal: 12,
  seatsLeft: 4,

  // Соц-доказательство.
  trainedCount: "350+",

  // Бот используется после заявки с лендинга: подтверждает запись и присылает оплату.
  registerUrl: "/#register",
  telegramBotUrl: "https://t.me/nempl_workshop_kop_bot",

  // Ссылки. Замените "#" на реальные.
  paymentUrl: "https://client.express-pay.by/show?k=2E4F8596-B7B0-4E8C-8AAC-07BA78696B99",
  telegramUrl: "https://t.me/neprostonewsai",
  contactUrl: "https://t.me/neprostonewsai",
  // Инструмент интенсива. Ставим и настраиваем вместе на месте.
  cursorUrl: "https://cursor.com",

  // Спикер и сообщество.
  speaker: {
    instagramUrl: "https://www.instagram.com/neprostomaksim?igsh=MWo1cnp4ZDd1cGRnZA==",
    telegramUrl: "https://t.me/neprostonewsai",
    siteUrl: "https://nempl.app",
  },
};
