import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "../components/Analytics";
import MetaPixel from "../components/MetaPixel";

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
  title: "Воркшопы по ИИ для бизнеса · Минск · Максим Леонов",
  description:
    "Очные воркшопы в Минске: ИИ-агенты, вайб-кодинг и ИИ-менеджер. Три часа практики на ваших задачах с Максимом Леоновым.",
  openGraph: {
    title: "Практические воркшопы по ИИ для бизнеса",
    description:
      "ИИ-помощники, первый продукт и автоматизация продаж. Практические воркшопы с Максимом Леоновым в Минске.",
    type: "website",
    locale: "ru_RU",
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
        {children}
        <Analytics site="workshopkopeek" />
        <MetaPixel />
      </body>
    </html>
  );
}
