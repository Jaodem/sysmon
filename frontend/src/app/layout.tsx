// Layout raíz — define la estructura HTML base y el estilo global
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sysmon — Monitor de Sistema",
  description: "Dashboard de monitoreo de procesos en tiempo real",
};

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${jetbrainsMono.variable} font-mono bg-black text-green-400 antialiased`}>
        {children}
      </body>
    </html>
  );
}