import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "OMODA|JAECOO SUV Premium untuk Keluarga Modern",
  description:
    "Temukan OMODA|JAECOO, SUV premium yang dirancang untuk keluarga modern, kenyamanan harian yang elegan, performa turbo, dan teknologi siap petualangan.",
  keywords: [
    "OMODA|JAECOO",
    "JAECOO & OMODA",
    "SUV premium",
    "SUV Indonesia",
    "test drive JAECOO & OMODA",
    "otomotif mewah"
  ],
  openGraph: {
    title: "OMODA|JAECOO Melaju Tanpa Batas",
    description: "SUV premium yang dirancang untuk keluarga modern dan petualangan.",
    type: "website",
    images: [
      {
        url: "/J5_1_2e7da5b171.jpegw3840q75.webp",
        width: 1600,
        height: 1067,
        alt: "SUV premium melaju melintasi pemandangan sinematik"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3327266894419348"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>{children}</body>
    </html>
  );
}
