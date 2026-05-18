import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "WAC - World Art Creator | 安岡 亮",
  description: "職人気質のこだわりと、AIの機動力を掛け合わせ、あなたの感性を形にします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-serif)]">
        {children}
      </body>
    </html>
  );
}
