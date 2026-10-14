import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "四叠半 · 沉浸式和室",
  description: "一间可第一人称漫游的日式四叠半和室。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
