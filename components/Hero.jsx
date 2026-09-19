import { site } from "@/lib/config";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">ИИ для бизнеса · Практика в Минске</p>
            <h1 className="hero-title">Меньше рутины.<br />Больше <span className="lime">возможностей.</span></h1>
            <p className="lead hero-lead">Научитесь работать с нейросетями — и создайте своего ИИ-помощника, бота или первый продукт за один вечер.</p>
            <div className="hero-btns">
              <a className="btn btn-primary" href="#schedule">Выбрать воркшоп <span aria-hidden="true">↗</span></a>
              <a className="hero-text-link" href="#atmosphere">Как это проходит <span aria-hidden="true">↘</span></a>
            </div>
            <div className="hero-proof"><img src="/speaker.jpg" alt="" /><p><strong>{site.trainedCount} человек уже прошли обучение</strong><span>Воркшопы с Максимом Леоновым</span></p></div>
          </div>
          <div className="hero-visual">
            <img className="hero-workshop-photo" src="/hero-bg.jpg" alt="Участники очного воркшопа работают с ноутбуками" fetchPriority="high" />
            <div className="photo-label mono"><span className="pulse-dot" /> ОФЛАЙН. В ЖИВОМ ДИАЛОГЕ.</div>
            <div className="hero-note"><span className="mono">ОТ ИДЕИ К РЕЗУЛЬТАТУ</span><strong>Вы ставите задачу.<br />ИИ помогает создавать.</strong><div className="note-bottom"><span>Ваш ноутбук. Ваши задачи.</span><span aria-hidden="true">↗</span></div></div>
          </div>
        </div>
        <div className="hero-facts"><div><span className="mono">01 / ФОРМАТ</span><strong>3 часа практики</strong></div><div><span className="mono">02 / ПОДХОД</span><strong>Без навыков кода</strong></div><div><span className="mono">03 / МЕСТО</span><strong>{site.city}, «Молоко»</strong></div><a href="#schedule"><span className="mono">СЕНТЯБРЬ — ОКТЯБРЬ 2026</span><strong>Найти свой вечер <span aria-hidden="true">↓</span></strong></a></div>
      </div>
    </section>
  );
}
