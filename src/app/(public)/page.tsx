import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'OptiPro — Conseil & développement sur mesure | Vence',
  description:
    'Audit gratuit, création de sites web et applications sur mesure, automatisation — OptiPro accompagne artisans, TPE et indépendants à Vence et en région PACA.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OptiPro — Conseil & développement sur mesure',
    description:
      'Je libère le temps des Artisans et TPE en optimisant et automatisant leurs processus.',
    url: 'https://www.opti-pro.fr',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 627,
        alt: 'OptiPro — Conseil & développement sur mesure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OptiPro — Conseil & développement sur mesure',
    description:
      'Je libère le temps des Artisans et TPE en optimisant et automatisant leurs processus.',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
