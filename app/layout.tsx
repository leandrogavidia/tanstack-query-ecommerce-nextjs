import localFont from "next/font/local";
import { ReactNode } from "react";

import ChatBotButton from "@/components/chat-bot-button"
import Footer from "@/components/footer"
import Header from "@/components/header"

import Providers from './providers';

import type { Metadata } from "next";

import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-100.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-100italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-200.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-200italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-300italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-500italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-600italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-700italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-800italic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-900.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/montserrat-v29-latin-900italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TanStack Query E-Commerce Next JS",
  description: "A Next.js e-commerce template showcasing data fetching and state management using TanStack Query.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />

          <ChatBotButton />
        </Providers>
      </body>
    </html>
  );
}
