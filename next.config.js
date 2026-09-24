/** @type {import('next').NextConfig} */
// Лендинг переехал в экосистему nempl.app (репозиторий NPM_site,
// app/(landings)/workshops). Этот проект остаётся только редиректом,
// чтобы старые рекламные ссылки и закладки продолжали работать.
// Query-параметры (utm_*, fbclid) Next передаёт в destination сам.
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://www.nempl.app/workshops",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
