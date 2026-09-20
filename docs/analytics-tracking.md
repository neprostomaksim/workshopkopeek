# План аналитики лендинга

Последнее обновление: 2026-09-20

## Инструменты

- Собственная аналитика визитов: `components/Analytics.jsx`
- Meta Pixel: `PageView` и `Contact`
- Meta Conversions API: `Lead` после сохранения номера в Telegram-боте
- Google Analytics 4: подключается через `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- Яндекс Метрика: подключается через `NEXT_PUBLIC_YANDEX_METRIKA_ID`

## События

| Событие | Где фиксируется | Триггер | Параметры |
| --- | --- | --- | --- |
| `page_view` | GA4, Метрика, Meta | Открытие страницы | URL, источник, UTM |
| `telegram_registration_clicked` | GA4, Метрика | Клик по регистрации в Telegram | `method`, `cta_text`, `cta_location` |
| `Contact` | Meta Pixel | Клик по регистрации в Telegram | `contact_method=telegram` |
| `Lead` | Meta CAPI | Бот сохранил имя и телефон | Воркшоп, стоимость, валюта |

## Основная воронка

1. Просмотр страницы.
2. Клик регистрации в Telegram.
3. Запуск бота.
4. Отправка имени и телефона — заявка.
5. Оплата и посещение учитываются отдельно в CRM/Supabase.

UTM-метки следует писать в нижнем регистре: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
