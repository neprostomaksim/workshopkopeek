import Image from "next/image";
import Reveal from "../Reveal";
import { Icon } from "../icons";
import { site } from "@/lib/config";

export default function Speaker() {
  return (
    <section className="section-flush" id="speaker">
      <div className="panel panel-blue">
        <div className="container">
          <div className="expert-grid">
            <Reveal className="photo-frame">
              <Image src="/speaker.jpg" alt="Максим Леонов — AI-эксперт и ведущий воркшопов" className="speaker-photo" width={667} height={931} sizes="(max-width: 767px) calc(100vw - 40px), 420px" quality={74} />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow">Спикер</p>
              <h2 className="h2" style={{ fontSize: "clamp(30px,4vw,42px)", marginTop: 16 }}>Максим Леонов</h2>
              <p className="lime" style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>
                AI-эксперт, автор канала «НЕ просто МАКСИМ»
              </p>
              <p className="lead" style={{ marginTop: 22 }}>
                Провожу корпоративные обучения и мастер-классы по ИИ для бизнеса — от банков до
                аудиторских компаний. Превращаю хаос нейросетей в понятный и управляемый инструмент.
              </p>

              <div className="speaker-links">
                <a href={site.speaker.instagramUrl} className="social-btn" target="_blank" rel="noopener" aria-label="Instagram Максима">
                  <Icon name="instagram" />
                </a>
                <a href={site.speaker.telegramUrl} className="social-btn" target="_blank" rel="noopener" aria-label="Telegram-канал Максима">
                  <Icon name="telegram" />
                </a>
                <a href={site.speaker.siteUrl} className="social-btn" target="_blank" rel="noopener" aria-label="Сайт nempl.app">
                  <Icon name="globe" />
                </a>
              </div>

              <div className="stat-row" style={{ display: "inline-flex" }}>
                <div className="stat glass"><b className="mono">{site.trainedCount}</b><span className="dim" style={{ fontSize: 14 }}>человек обучено</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
