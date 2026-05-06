import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="antialiased">
      <body className="bg-dark-base text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
