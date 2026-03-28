import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'OptiPro — Conseil & développement sur mesure',
    template: '%s | OptiPro',
  },
  description:
    'Audit, création de sites et web apps sur mesure, automatisation — OptiPro accompagne artisans, TPE et indépendants dans leur transformation numérique.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTeaserMode = false;

  return (
    <html lang="fr" data-theme="light">
      <body className={outfit.className}>
        <ThemeProvider>
          {!isTeaserMode && <Header />}
          <PageTransition>{children}</PageTransition>
          {!isTeaserMode && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
