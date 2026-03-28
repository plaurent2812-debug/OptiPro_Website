import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site OptiPro — éditeur, hébergement, données personnelles.',
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

export default function MentionsLegalesPage() {
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
            Mentions légales
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0' }}>
            Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN)
          </p>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

          {/* 1. Éditeur */}
          <h2 style={sectionHeadingStyle}>1. Éditeur du site</h2>
          <p style={paragraphStyle}>
            Le site <strong>optipro.fr</strong> est édité par :
          </p>
          <p style={paragraphStyle}>
            <strong>Pierre Laurent</strong><br />
            Activité : Conseil &amp; développement d&apos;outils numériques sur mesure<br />
            Dénomination commerciale : <strong>OptiPro</strong><br />
            Email : <a href="mailto:contact@optipro.fr" style={linkStyle}>contact@optipro.fr</a><br />
            Site web : <a href="https://optipro.fr" style={linkStyle}>optipro.fr</a>
          </p>

          {/* 2. Hébergement */}
          <h2 style={sectionHeadingStyle}>2. Hébergement</h2>
          <p style={paragraphStyle}>
            Le site est hébergé par :
          </p>
          <p style={paragraphStyle}>
            <strong>Vercel Inc.</strong><br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789<br />
            États-Unis d&apos;Amérique<br />
            <a href="https://vercel.com" style={linkStyle} target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>

          {/* 3. Propriété intellectuelle */}
          <h2 style={sectionHeadingStyle}>3. Propriété intellectuelle</h2>
          <p style={paragraphStyle}>
            L&apos;ensemble des éléments constituant ce site (textes, images, logotypes, structure, code source) est la propriété exclusive de Pierre Laurent / OptiPro, sauf mentions contraires.
          </p>
          <p style={paragraphStyle}>
            Toute reproduction, représentation, modification, publication, adaptation ou exploitation partielle ou totale des éléments du site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l&apos;autorisation écrite préalable de Pierre Laurent.
          </p>
          <p style={paragraphStyle}>
            Toute exploitation non autorisée du site ou de ses contenus sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>

          {/* 4. Données personnelles */}
          <h2 style={sectionHeadingStyle}>4. Données personnelles</h2>
          <p style={paragraphStyle}>
            Le site collecte des données personnelles uniquement via le formulaire de contact. Les informations collectées sont : nom, adresse e-mail, numéro de téléphone (facultatif), nom de l&apos;entreprise (facultatif), secteur d&apos;activité (facultatif) et message.
          </p>
          <p style={paragraphStyle}>
            Ces données sont traitées dans le seul but de répondre aux demandes de contact. Elles sont transmises via l&apos;API Resend pour l&apos;envoi d&apos;e-mails et ne sont pas conservées dans une base de données tierce.
          </p>
          <p style={paragraphStyle}>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez : <a href="mailto:contact@optipro.fr" style={linkStyle}>contact@optipro.fr</a>.
          </p>
          <p style={paragraphStyle}>
            Pour en savoir plus, consultez la <a href="/confidentialite" style={linkStyle}>politique de confidentialité</a>.
          </p>

          {/* 5. Cookies */}
          <h2 style={sectionHeadingStyle}>5. Cookies</h2>
          <p style={paragraphStyle}>
            Ce site n&apos;utilise pas de cookies de traçage, de ciblage publicitaire ou d&apos;analyse d&apos;audience. Seuls des cookies techniques strictement nécessaires au fonctionnement du site (gestion de session Next.js) peuvent être déposés. Ces cookies ne collectent aucune donnée personnelle identifiable et ne nécessitent pas de consentement.
          </p>

          {/* 6. Responsabilité */}
          <h2 style={sectionHeadingStyle}>6. Limitation de responsabilité</h2>
          <p style={paragraphStyle}>
            Pierre Laurent / OptiPro s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Cependant, OptiPro ne peut garantir l&apos;exhaustivité ou l&apos;absence d&apos;erreur des informations présentées et décline toute responsabilité pour toute imprécision, inexactitude ou omission.
          </p>
          <p style={paragraphStyle}>
            OptiPro ne peut être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation de ce site ou de l&apos;impossibilité d&apos;y accéder. Les liens hypertextes présents sur le site peuvent renvoyer vers des sites tiers ; OptiPro n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>

          {/* 7. Crédits */}
          <h2 style={sectionHeadingStyle}>7. Crédits</h2>
          <p style={paragraphStyle}>
            Ce site a été conçu et développé par <strong>Pierre Laurent</strong> — OptiPro.
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
