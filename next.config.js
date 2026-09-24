/** @type {import('next').NextConfig} */
// Лендинг переехал в экосистему nempl.app (репозиторий NPM_site).
// Этот проект остаётся только редиректом: реклама воркшопа 29.09 ведёт
// сюда, поэтому отправляем на лендинг этого воркшопа — /ai-agents.
// Query-параметры (utm_*, fbclid) Next передаёт в destination сам.
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://www.nempl.app/ai-agents",
        // Временный (307): адрес назначения меняется под ближайший воркшоп,
        // а постоянный 308 браузеры кэшируют и не увидят следующую смену.
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
