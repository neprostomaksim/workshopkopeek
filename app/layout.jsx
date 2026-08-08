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
  title: "Вайб-кодинг за 3 часа — собери свой первый продукт · Минск",
  description:
    "Практический интенсив для предпринимателей и руководителей. За 3 часа соберёте работающий продукт руками — код пишет ИИ-агент. Уйдёте с мини-CRM и с навыками разработки инструментами вайб-кодинга.",
  openGraph: {
    title: "Вайб-кодинг за 3 часа — собери свой первый продукт",
    description:
      "За 3 часа соберёте работающий продукт руками — код пишет ИИ-агент. Мини-CRM + навык вайб-кодинга. Минск.",
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
