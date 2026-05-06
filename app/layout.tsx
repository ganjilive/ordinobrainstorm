import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Ordino AI",
  description: "Ordino AI onboarding prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark antialiased ${chakraPetch.variable} ${jetbrainsMono.variable}`} style={chakraPetch.style}>
      <body className="bg-dark-base text-white min-h-screen" style={chakraPetch.style}>
        {children}
      </body>
    </html>
  );
}
