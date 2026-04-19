'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { offerCategories, subscription, type OfferCategory } from '@/data/offers';
import styles from './OffersSection.module.css';

export default function OffersSection() {
  const [activeTab, setActiveTab] = useState<OfferCategory['id']>('artisans');

  const scrollToCategory = (id: OfferCategory['id']) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionTitle}>
            <h2>Nos offres</h2>
            <p>
              Des formules claires selon votre taille et votre besoin. Les prix
              sont affichés pour les petites prestations, sur devis pour les
              projets structurants.
            </p>
          </div>

          {/* Onglets */}
          <div className={styles.tabs} role="tablist" aria-label="Catégories d'offres">
            {offerCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
              >
                <span className={styles.tabIcon}>{cat.icon}</span>
                {cat.title}
              </button>
            ))}
          </div>

          {/* Catégories */}
          {offerCategories.map((cat) => (
            <div key={cat.id} id={cat.id} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>{cat.icon}</div>
                <span className={styles.categoryTagline}>{cat.tagline}</span>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <p className={styles.categorySubtitle}>{cat.subtitle}</p>
                <p className={styles.categoryDescription}>{cat.description}</p>
              </div>

              <div className={styles.offersGrid}>
                {cat.offers.map((offer) => {
                  const isAudit = offer.id === 'audit';
                  return (
                    <article
                      key={offer.id}
                      className={`${styles.offerCard} ${isAudit ? styles.offerHighlight : ''}`}
                    >
                      <h4 className={styles.offerName}>{offer.name}</h4>
                      <p className={styles.offerDescription}>{offer.description}</p>
                      <div className={styles.offerPriceBlock}>
                        <span className={styles.offerPrice}>{offer.price}</span>
                        {offer.delay && (
                          <span className={styles.offerDelay}>{offer.delay}</span>
                        )}
                      </div>
                      <ul className={styles.offerFeatures}>
                        {offer.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>

              <div className={styles.categoryCta}>
                <Button href={cat.ctaHref} variant="primary">
                  {cat.ctaLabel}
                </Button>
              </div>
            </div>
          ))}

          <p className={styles.tarifFootnote}>
            <strong>Tous les prix sont indiqués HT.</strong> TVA 20% applicable. Les
            devis sont valables 30 jours. Pour les projets complexes, un audit
            approfondi est facturé avant engagement — il est déduit du devis final
            si la mission est signée.
          </p>
        </div>
      </section>

      {/* Abonnement */}
      <section className={styles.subscriptionWrap}>
        <div className="container">
          <div className={styles.sectionTitle}>
            <h2>L&apos;abonnement qui fait la différence</h2>
            <p>
              Proposé à la fin de chaque mission. Parce qu&apos;un bon outil doit
              pouvoir évoluer sans re-devis à chaque fois.
            </p>
          </div>

          <div className={styles.subscriptionCard}>
            <div className={styles.subscriptionHeader}>
              <h3 className={styles.subscriptionName}>{subscription.name}</h3>
              <span className={styles.subscriptionPrice}>{subscription.price}</span>
            </div>
            <p className={styles.subscriptionDescription}>
              {subscription.description}
            </p>
            <ul className={styles.subscriptionFeatures}>
              {subscription.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
              <Link href="/contact?cible=abonnement" className="btn btn-outline">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
