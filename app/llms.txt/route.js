import { site } from "@/lib/config";
import { workshops } from "@/lib/workshops";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://workshopkopeek.vercel.app";

export function GET() {
  const schedule = workshops
    .map(
      (workshop) =>
        `- ${workshop.title}: ${workshop.date}, ${workshop.time}, ${site.city}. ${workshop.tagline}.`,
    )
    .join("\n");

  const content = `# Воркшопы по ИИ с Максимом Леоновым

Практические очные воркшопы по искусственному интеллекту для предпринимателей и руководителей в Минске. Участники работают на своих задачах и за три часа создают ИИ-помощника, бота или прототип продукта. Навыки программирования не требуются.

## Расписание
${schedule}

## Формат
- Очно, небольшие группы
- Продолжительность: 3 часа
- Место: ${site.city}, ${site.venue}
- Можно работать с бесплатными инструментами; подписка ChatGPT или Claude даёт дополнительные возможности и лимиты
- Организатор и спикер: Максим Леонов, AI-эксперт и автор канала «НЕ просто МАКСИМ»

## Основные страницы
- Сайт и расписание: ${SITE_URL}/
- Регистрация: ${site.registerUrl}
- Telegram-канал: ${site.telegramUrl}
- Сайт спикера: ${site.speaker.siteUrl}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
