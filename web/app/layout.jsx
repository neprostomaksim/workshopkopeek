import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Воркшоп «Собери своего ИИ-агента» · Минск, 31 июля",
  description:
    "За три часа соберёте команду ИИ-агентов, которые заберут рутину. Руками, на своём ноутбуке. Без единой строчки кода. Минск, 31 июля.",
  openGraph: {
    title: "Собери своего ИИ-агента — воркшоп в Минске",
    description:
      "За три часа соберёте команду ИИ-агентов, которые заберут рутину. Без кода. 31 июля, Минск.",
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
      <body>{children}</body>
    </html>
  );
}
