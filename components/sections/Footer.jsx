import { site } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            <span className="lime mono">&lt;/&gt;</span> Воркшопы по ИИ
          </div>
          <p className="dim" style={{ fontSize: 14 }}>
            Практические воркшопы по нейросетям · {site.city}, {site.venue}
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
