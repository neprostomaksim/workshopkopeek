import { site } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            <span className="lime mono">&lt;/&gt;</span> Вайб-кодинг
          </div>
          <p className="dim" style={{ fontSize: 14 }}>
            Интенсив по вайб-кодингу · {site.city}, {site.eventDateLabel.replace("Пятница, ", "")}
          </p>
        </div>
        <div className="footer-links">
          <a href={site.telegramUrl} target="_blank" rel="noopener">Telegram-канал</a>
          <a href={site.contactUrl} target="_blank" rel="noopener">Написать</a>
        </div>
      </div>
      <div className="container" style={{ marginTop: 28 }}>
        <p className="dim" style={{ fontSize: 13 }}>© 2026 Максим Леонов</p>
      </div>
    </footer>
  );
}
