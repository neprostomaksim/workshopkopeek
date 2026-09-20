import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "../components/Analytics";
import MarketingAnalytics from "../components/MarketingAnalytics";
import MetaPixel from "../components/MetaPixel";
import StructuredData from "../components/StructuredData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://workshopkopeek.vercel.app";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Воркшопы по ИИ в Минске для бизнеса · Максим Леонов",
  description:
    "Практические воркшопы по ИИ в Минске: ИИ-агенты, вайб-кодинг и ИИ-менеджер. За 3 часа создайте рабочий результат на своих задачах.",
  keywords: [
    "воркшопы по ИИ Минск",
    "обучение нейросетям Минск",
    "ИИ для бизнеса",
    "вайб-кодинг",
    "ИИ-агенты",
    "курсы искусственного интеллекта Минск",
  ],
  authors: [{ name: "Максим Леонов", url: "https://nempl.app" }],
  creator: "Максим Леонов",
  publisher: "Максим Леонов",
  category: "education",
  alternates: {
    canonical: "/",
    languages: { "ru-BY": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "aEh7XVNU7vm6MHakE99_6K227RXnLwTSaBFml8DwiAw",
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: "Практические воркшопы по ИИ в Минске",
    description:
      "ИИ-помощники, первый продукт и автоматизация продаж. Практические воркшопы с Максимом Леоновым в Минске.",
    url: "/",
    siteName: "Воркшопы по ИИ с Максимом Леоновым",
    type: "website",
    locale: "ru_BY",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1024,
        height: 571,
        alt: "Практический воркшоп по ИИ в Минске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Практические воркшопы по ИИ в Минске",
    description: "За 3 часа создайте ИИ-помощника, бота или первый продукт на своих задачах.",
    images: ["/hero-bg.jpg"],
  },
};

export const viewport = {
  themeColor: "#0B0C0E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <body>
        <StructuredData />
        {children}
        <Analytics site="workshopkopeek" />
        <MarketingAnalytics />
        <MetaPixel />
      </body>
    </html>
  );
}
