import Image from "next/image";
import Reveal from "../Reveal";

// Фото лежат в public/gallery. Порядок подобран под masonry (чередование ориентаций).
const PHOTOS = ["g1.jpg", "g2.jpg", "g4.jpg", "g5.jpg", "g6.jpg", "g3.jpg"];

export default function Gallery() {
  return (
    <section className="section" id="atmosphere" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal className="center" style={{ margin: "0 auto 56px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Атмосфера</p>
          <h2 className="h2" style={{ marginTop: 18 }}>Как проходят наши воркшопы</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Небольшие группы, ноутбуки, живая работа — и готовый результат к концу вечера.
          </p>
        </Reveal>

        <div className="gallery">
          {PHOTOS.map((src, i) => (
            <Reveal key={src} className="gallery-item" delay={(i % 3) * 0.06}>
              <Image src={`/gallery/${src}`} alt={`Участники практического воркшопа по ИИ в Минске — фото ${i + 1}`} width={1200} height={1600} sizes="(max-width: 767px) calc(100vw - 40px), 33vw" quality={72} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
