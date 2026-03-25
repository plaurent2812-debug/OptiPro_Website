import type { Metadata } from "next";
import Link from "next/link";
import SectorCard from "@/components/ui/SectorCard";
import { sectors } from "@/data/sectors";

export const metadata: Metadata = {
    title: "Corps de métier — OptiBoard",
    description: "OptiBoard gère l'administration des artisans du bâtiment : plombiers, électriciens, menuisiers, peintres, maçons et entreprises multi-corps.",
};

export default function SectorsPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)' }}>
            <div className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="section-label">🏗️ Secteurs BTP</div>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        Fait pour tous les artisans du bâtiment
                    </h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
                        Quelle que soit votre spécialité, les défis sont les mêmes : trop de paperasse, pas assez de temps.
                        OptiBoard s&apos;adapte à votre métier.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '5rem' }}>
                    {sectors.map((sector) => (
                        <SectorCard key={sector.id} sector={sector} />
                    ))}
                </div>

                {/* CTA */}
                <div style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '2rem',
                    padding: '3.5rem 2rem',
                    border: '1px solid rgba(249,115,22,0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div className="section-label" style={{ margin: '0 auto 1.25rem', display: 'inline-flex' }}>🚀 Votre métier, notre outil</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#fff' }}>
                        Votre corps de métier est pris en charge
                    </h2>
                    <p style={{ opacity: 0.75, fontSize: '1rem', color: '#fff', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                        Découvrez les formules adaptées à votre activité — à partir de 299€/mois, sans engagement.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            href="/services"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0.85rem 2rem',
                                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                                color: '#fff',
                                borderRadius: '0.875rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
                                textDecoration: 'none',
                            }}
                        >
                            Voir les tarifs →
                        </Link>
                        <Link
                            href="/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0.85rem 2rem',
                                background: 'rgba(255,255,255,0.08)',
                                color: '#fff',
                                borderRadius: '0.875rem',
                                fontWeight: 600,
                                fontSize: '1rem',
                                border: '1px solid rgba(255,255,255,0.15)',
                                textDecoration: 'none',
                            }}
                        >
                            Essai gratuit 14 jours
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
