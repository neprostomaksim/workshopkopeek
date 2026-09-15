import Reveal from "../Reveal";

// Фото лежат в public/gallery. Порядок подобран под masonry (чередование ориентаций).
const PHOTOS = ["g2.jpg", "g1.jpg", "g4.jpg", "g5.jpg", "g6.jpg", "g3.jpg"];

export default function Gallery() {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
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
              <img src={`/gallery/${src}`} alt="Атмосфера воркшопа Максима Леонова" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
