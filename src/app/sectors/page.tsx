import type { Metadata } from "next";
import SectorCard from "@/components/ui/SectorCard";
import { sectors } from "@/data/sectors";

export const metadata: Metadata = {
    title: "Corps de métier — OptiBoard",
    description: "OptiBoard gère l'administration des artisans du bâtiment : plombiers, électriciens, menuisiers, peintres, maçons et entreprises multi-corps.",
};

export default function SectorsPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)', transition: 'background 0.4s ease' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sectors.map((sector) => (
                        <SectorCard key={sector.id} sector={sector} />
                    ))}
                </div>
            </div>
        </div>
    );
}
