import Reveal from "../Reveal";
import ImageSlot from "../ImageSlot";
import { site } from "@/lib/config";

export default function Speaker() {
  return (
    <section className="section">
      <div className="container">
        <div className="expert-grid">
          <Reveal className="photo-frame">
            <ImageSlot label="Фото спикера · 4:5" style={{ width: "100%", height: "100%" }} />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">Спикер</p>
            <h2 className="h2" style={{ fontSize: "clamp(30px,4vw,42px)", marginTop: 16 }}>Максим Леонов</h2>
            <p className="lime" style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>
              AI-тренер, автор канала «НЕ просто МАКСИМ»
            </p>
            <p className="lead" style={{ marginTop: 22 }}>
              Провожу корпоративные обучения и мастер-классы по ИИ для бизнеса — от банков до
              аудиторских компаний. Веду сообщество Core M.AI.N. Учу так, чтобы после занятия человек
              открыл ноутбук и сделал сам.
            </p>
            <div className="stat-row">
              <div className="stat glass"><b className="mono">{site.trainedCount}</b><span className="dim" style={{ fontSize: 14 }}>человек обучено</span></div>
              <div className="stat glass"><b className="mono">{site.yearsTeaching}</b><span className="dim" style={{ fontSize: 14 }}>в обучении взрослых</span></div>
              <div className="stat glass"><b>{site.community}</b><span className="dim" style={{ fontSize: 14 }}>сообщество</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
