import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "OptiBoard — Admin chantier automatisée pour artisans",
    template: "%s | OptiBoard",
  },
  description: "Créez vos devis en 2 min depuis Telegram, synchronisés avec Pennylane. Essai gratuit 14 jours.",
  metadataBase: new URL("https://optipro.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "OptiBoard",
    title: "OptiBoard — Admin chantier automatisée pour artisans",
    description: "Envoyez un message depuis votre chantier, on s'occupe du reste. Devis par Telegram, sync Pennylane. Essai gratuit 14 jours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiBoard — Admin chantier automatisée pour artisans",
    description: "Créez vos devis en 2 min depuis Telegram, synchronisés avec Pennylane. Essai gratuit 14 jours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTeaserMode = false;

  return (
    <html lang="fr" data-theme="dark">
      <body className={outfit.className}>
        <ThemeProvider>
          {!isTeaserMode && <Header />}
          <div>{children}</div>
          {!isTeaserMode && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
