import Button from '@/components/ui/Button';

export default function AuditCta() {
  return (
    <div className="audit-cta">
      <h2>Commencez par un audit</h2>
      <p>
        On regarde ensemble vos outils et vos process. Vous repartez avec un
        diagnostic clair et des recommandations concrètes.
      </p>
      <p className="audit-cta-note">Remboursé si contrat signé</p>
      <Button href="/contact" variant="primary">
        Demander un contact
      </Button>
    </div>
  );
}
