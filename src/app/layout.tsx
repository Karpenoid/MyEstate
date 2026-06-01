import { Geist, Geist_Mono, Inter } from "next/font/google";

import Providers from "@/app/api/auth/providers/providers";
import { FloatingHeader } from "@/widgets/FloatingHeader";
import { GemChat } from "@/widgets/GemChat";

import type { Metadata } from "next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "MyEstate. AI Real Estate Analytics",
  description: "AI-powered real estate analytics and search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-background flex min-h-full flex-col transition-colors duration-500">
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-full flex-col px-4 py-3 md:px-6 md:py-4">
            <FloatingHeader />
            <main className="w-full flex-1">
              {children} <GemChat />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
