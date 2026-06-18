import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
  title: "OMODA|JAECOO Premium SUV for Modern Families",
  description:
    "Discover the OMODA|JAECOO , a premium SUV crafted for modern families, refined daily comfort, turbo performance, and adventure-ready technology.",
  keywords: [
    "OMODA|JAECOO",
    "JAECOO & OMODA",
    "premium SUV",
    "SUV Indonesia",
    "test drive JAECOO & OMODA",
    "luxury automotive"
  ],
  openGraph: {
    title: "OMODA|JAECOO Drive Beyond Limits",
    description: "Premium SUV designed for modern families and adventure.",
    type: "website",
    images: [
      {
        url: "/J5_1_2e7da5b171.jpegw3840q75.webp",
        width: 1600,
        height: 1067,
        alt: "Premium SUV driving through a cinematic landscape"
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
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>{children}</body>
    </html>
  );
}
