import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteShell from "@/components/site-shell";
import "./globals.css";

const calligraphy = localFont({
  src: "../../public/font/kssweetheavycalligraphy.ttf",
  variable: "--font-calligraphy",
  display: "swap",
});

const japaneseCalligraphy = localFont({
  src: "../../public/font/衡山毛筆行書.ttf",
  variable: "--font-japanese-calligraphy",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Domuki — 童夢綺",
    template: "%s — Domuki",
  },
  description: "Domuki's personal archive for orchestral music, documents, and creative work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${calligraphy.variable} ${japaneseCalligraphy.variable} antialiased`}
    >
      <body className="m-0 min-h-screen">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
