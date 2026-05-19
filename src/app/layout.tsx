import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DS Visualizer by torchR | Learn Algorithms Visually",
  description:
    "DS Visualizer by torchR — interactive visual learning for data structures and algorithms.",
};

import { BackgroundElements } from "@/components/BackgroundElements";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased selection:bg-primary/20`}
      >
        <Providers>
          <BackgroundElements />
          {children}
        </Providers>
      </body>
    </html>
  );
}
