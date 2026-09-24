export default function StickyBars() {
  return (
    <header className="site-header show">
      <div className="header-bar">
        <a className="logo" href="#top" aria-label="Воркшопы по ИИ — в начало"><span className="brand-mark mono">/ai</span> мастерская<span className="logo-dot">.</span></a>
        <nav className="header-nav" aria-label="Основная навигация"><a href="#schedule">Воркшопы</a><a href="#speaker">Спикер</a><a href="#atmosphere">Атмосфера</a></nav>
        <a className="btn btn-secondary" href="#register" data-analytics-event="cta_clicked" data-analytics-location="header">Записаться <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}
