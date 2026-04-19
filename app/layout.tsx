import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ReactQueryProvider from "./react-query-provider";
import I18nProvider from "./I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Your personal task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
        `}
      >
        <I18nProvider>
          <Providers>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
