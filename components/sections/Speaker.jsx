import Reveal from "../Reveal";
import { Icon } from "../icons";
import { site } from "@/lib/config";

export default function Speaker() {
  return (
    <section className="section-flush">
      <div className="panel panel-blue">
        <div className="container">
          <div className="expert-grid">
            <Reveal className="photo-frame">
              <img src="/speaker.jpg" alt="Максим Леонов" className="speaker-photo" />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow">Спикер</p>
              <h2 className="h2" style={{ fontSize: "clamp(30px,4vw,42px)", marginTop: 16 }}>Максим Леонов</h2>
              <p className="lime" style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>
                AI-эксперт, автор канала «НЕ просто МАКСИМ»
              </p>
              <p className="lead" style={{ marginTop: 22 }}>
                Провожу корпоративные обучения и мастер-классы по ИИ для бизнеса — от банков до
                аудиторских компаний. Руководитель корпоративного обучения M.AI.N community.
                Превращаю хаос нейросетей в понятный и управляемый инструмент.
              </p>

              <div className="speaker-links">
                <a href={site.speaker.instagramUrl} className="social-btn" target="_blank" rel="noopener" aria-label="Instagram Максима">
                  <Icon name="instagram" />
                </a>
                <a href={site.speaker.telegramUrl} className="social-btn" target="_blank" rel="noopener" aria-label="Telegram-канал Максима">
                  <Icon name="telegram" />
                </a>
                <a href={site.speaker.mainUrl} className="main-logo-link" target="_blank" rel="noopener" aria-label="M.AI.N community в Telegram">
                  <img src="/main-logo.png" alt="M.AI.N community" />
                </a>
              </div>

              <div className="stat-row stat-2">
                <div className="stat glass"><b className="mono">{site.trainedCount}</b><span className="dim" style={{ fontSize: 14 }}>человек обучено</span></div>
                <div className="stat glass"><b>{site.community}</b><span className="dim" style={{ fontSize: 14 }}>сообщество</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
