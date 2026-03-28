import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du site OptiPro — collecte, traitement et protection de vos données personnelles.',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--primary)',
  marginBottom: '0.75rem',
  marginTop: '2.5rem',
  letterSpacing: '-0.01em',
};

const paragraphStyle: React.CSSProperties = {
  color: 'var(--secondary)',
  fontSize: '0.95rem',
  lineHeight: 1.8,
  marginBottom: '0.5rem',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--accent)',
  textDecoration: 'none',
};

const listStyle: React.CSSProperties = {
  color: 'var(--secondary)',
  fontSize: '0.95rem',
  lineHeight: 1.8,
  paddingLeft: '1.5rem',
  marginBottom: '0.5rem',
};

export default function ConfidentialitePage() {
  return (
    <main style={{ paddingTop: '6rem' }}>
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>

          {/* Page title */}
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              color: 'var(--primary)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            Politique de confidentialité
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0' }}>
            Conformément au Règlement général sur la protection des données (RGPD — UE 2016/679) et à la loi Informatique et Libertés
          </p>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          {/* 1. Responsable */}
          <h2 style={sectionHeadingStyle}>1. Responsable du traitement</h2>
          <p style={paragraphStyle}>
            Le responsable du traitement des données collectées sur ce site est :
          </p>
          <p style={paragraphStyle}>
            <strong>Pierre Laurent</strong> — OptiPro<br />
            Email : <a href="mailto:contact@optipro.fr" style={linkStyle}>contact@optipro.fr</a>
          </p>

          {/* 2. Données collectées */}
          <h2 style={sectionHeadingStyle}>2. Données collectées</h2>
          <p style={paragraphStyle}>
            Ce site collecte des données personnelles uniquement via le formulaire de contact. Les champs du formulaire sont les suivants :
          </p>
          <ul style={listStyle}>
            <li>Nom et prénom (obligatoire)</li>
            <li>Adresse e-mail (obligatoire)</li>
            <li>Numéro de téléphone (facultatif)</li>
            <li>Nom de l&apos;entreprise (facultatif)</li>
            <li>Secteur d&apos;activité (facultatif)</li>
            <li>Message (obligatoire)</li>
          </ul>
          <p style={paragraphStyle}>
            Aucune autre donnée n&apos;est collectée. Ce site ne dispose pas d&apos;espace membre, de newsletter, de formulaire d&apos;inscription ni d&apos;outil d&apos;analyse d&apos;audience.
          </p>

          {/* 3. Finalité */}
          <h2 style={sectionHeadingStyle}>3. Finalité du traitement</h2>
          <p style={paragraphStyle}>
            Les données collectées via le formulaire de contact sont utilisées exclusivement pour :
          </p>
          <ul style={listStyle}>
            <li>Répondre aux demandes de renseignements ou de devis</li>
            <li>Établir un premier contact dans le cadre d&apos;une relation commerciale potentielle</li>
          </ul>
          <p style={paragraphStyle}>
            Aucune donnée n&apos;est utilisée à des fins de prospection commerciale automatisée, de profilage ou de prise de décision automatisée.
          </p>

          {/* 4. Base légale */}
          <h2 style={sectionHeadingStyle}>4. Base légale du traitement</h2>
          <p style={paragraphStyle}>
            Le traitement repose sur l&apos;intérêt légitime du responsable du traitement (article 6.1.f du RGPD) : répondre aux demandes de contact initiées volontairement par l&apos;utilisateur.
          </p>

          {/* 5. Traitement via Resend */}
          <h2 style={sectionHeadingStyle}>5. Traitement technique — Resend API</h2>
          <p style={paragraphStyle}>
            Les données du formulaire sont transmises via l&apos;<strong>API Resend</strong> (Resend Inc.) pour l&apos;acheminement de l&apos;e-mail de contact vers Pierre Laurent. Resend agit en tant que sous-traitant au sens du RGPD et applique des mesures de sécurité adaptées.
          </p>
          <p style={paragraphStyle}>
            Les données ne sont pas stockées dans une base de données dédiée au-delà de la durée nécessaire à la délivrance de l&apos;e-mail. Elles ne sont pas revendues ni transmises à d&apos;autres tiers.
          </p>

          {/* 6. Durée de conservation */}
          <h2 style={sectionHeadingStyle}>6. Durée de conservation</h2>
          <p style={paragraphStyle}>
            Les données sont conservées pour la durée nécessaire à la gestion de la relation commerciale et au respect des obligations légales applicables (notamment les obligations comptables et fiscales en cas de contrat conclu).
          </p>
          <p style={paragraphStyle}>
            En l&apos;absence de suite commerciale, les échanges de contact sont conservés pendant une durée maximale de <strong>3 ans</strong> à compter du dernier contact, conformément aux recommandations de la CNIL.
          </p>

          {/* 7. Cookies */}
          <h2 style={sectionHeadingStyle}>7. Cookies et traceurs</h2>
          <p style={paragraphStyle}>
            Ce site n&apos;utilise <strong>aucun cookie de traçage</strong>, de ciblage publicitaire ou d&apos;analyse d&apos;audience (pas de Google Analytics, pas de pixel de suivi, pas de réseaux sociaux intégrés).
          </p>
          <p style={paragraphStyle}>
            Seuls des cookies techniques strictement nécessaires au fonctionnement du site (framework Next.js) peuvent être déposés. Ces cookies ne collectent aucune donnée personnelle identifiable et ne nécessitent pas de consentement au sens de la directive ePrivacy.
          </p>

          {/* 8. Droits */}
          <h2 style={sectionHeadingStyle}>8. Vos droits</h2>
          <p style={paragraphStyle}>
            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
          </p>
          <ul style={listStyle}>
            <li><strong>Droit d&apos;accès</strong> — obtenir une copie des données vous concernant</li>
            <li><strong>Droit de rectification</strong> — corriger des données inexactes ou incomplètes</li>
            <li><strong>Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible</li>
            <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement de vos données</li>
            <li><strong>Droit à la limitation</strong> — demander la restriction du traitement</li>
          </ul>
          <p style={paragraphStyle}>
            Pour exercer l&apos;un de ces droits, adressez votre demande par e-mail à : <a href="mailto:contact@optipro.fr" style={linkStyle}>contact@optipro.fr</a>. Une réponse vous sera apportée dans un délai maximum de 30 jours.
          </p>
          <p style={paragraphStyle}>
            Si vous estimez que le traitement de vos données n&apos;est pas conforme à la réglementation, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (Commission nationale de l&apos;informatique et des libertés) : <a href="https://www.cnil.fr" style={linkStyle} target="_blank" rel="noopener noreferrer">cnil.fr</a>.
          </p>

          {/* 9. Sécurité */}
          <h2 style={sectionHeadingStyle}>9. Sécurité des données</h2>
          <p style={paragraphStyle}>
            Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger les données contre tout accès non autorisé, modification, divulgation ou destruction : connexion HTTPS, accès restreint aux données, utilisation de fournisseurs conformes au RGPD.
          </p>

          {/* 10. Modifications */}
          <h2 style={sectionHeadingStyle}>10. Modifications de la présente politique</h2>
          <p style={paragraphStyle}>
            Cette politique de confidentialité peut être mise à jour à tout moment pour refléter des évolutions légales ou techniques. La date de dernière mise à jour est indiquée en bas de cette page.
          </p>

          <hr style={{ margin: '2.5rem 0 1.5rem', border: 'none', borderTop: '1px solid var(--border)' }} />
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
            Dernière mise à jour : mars 2025
          </p>

        </div>
      </section>
    </main>
  );
}
