-- ============================================================
-- OptiPro — Schéma Supabase
-- Auto-entrepreneur | Franchise TVA (art. 293B CGI)
-- ============================================================
-- Instructions :
-- 1. Créer un nouveau projet sur supabase.com
-- 2. Aller dans SQL Editor et coller ce script
-- 3. Cliquer sur "Run"
-- ============================================================

-- ── Table clients ─────────────────────────────────────────
CREATE TABLE clients (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  nom             TEXT NOT NULL,
  prenom          TEXT,
  email           TEXT,
  telephone       TEXT,
  adresse         TEXT,
  ville           TEXT,
  code_postal     TEXT,
  siret           TEXT,
  notes           TEXT,
  statut          TEXT DEFAULT 'prospect'
                  CHECK (statut IN ('prospect', 'client_actif', 'client_inactif'))
);

-- ── Table devis ────────────────────────────────────────────
CREATE TABLE devis (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  numero          TEXT UNIQUE NOT NULL,
  client_id       UUID REFERENCES clients(id) ON DELETE SET NULL,
  statut          TEXT DEFAULT 'brouillon'
                  CHECK (statut IN ('brouillon', 'envoye', 'accepte', 'refuse', 'expire')),
  date_emission   DATE DEFAULT CURRENT_DATE,
  date_validite   DATE,
  montant_ht      NUMERIC(10,2) DEFAULT 0,
  notes           TEXT
);

-- ── Table devis_lignes ─────────────────────────────────────
CREATE TABLE devis_lignes (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  devis_id         UUID REFERENCES devis(id) ON DELETE CASCADE NOT NULL,
  type             TEXT DEFAULT 'prestation'
                   CHECK (type IN ('prestation', 'abonnement')),
  description      TEXT NOT NULL,
  quantite         NUMERIC(10,2) DEFAULT 1,
  unite            TEXT DEFAULT 'forfait'
                   CHECK (unite IN ('forfait', 'heure', 'jour', 'mois')),
  prix_unitaire_ht NUMERIC(10,2) DEFAULT 0,
  montant_ht       NUMERIC(10,2) GENERATED ALWAYS AS (quantite * prix_unitaire_ht) STORED,
  ordre            INT DEFAULT 0
);

-- ── Table abonnements ──────────────────────────────────────
CREATE TABLE abonnements (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  client_id             UUID REFERENCES clients(id) ON DELETE SET NULL,
  nom                   TEXT NOT NULL,
  description           TEXT,
  montant_mensuel_ht    NUMERIC(10,2) DEFAULT 0,
  periodicite           TEXT DEFAULT 'mensuel'
                        CHECK (periodicite IN ('mensuel', 'trimestriel', 'annuel')),
  date_debut            DATE DEFAULT CURRENT_DATE,
  date_fin              DATE,
  statut                TEXT DEFAULT 'actif'
                        CHECK (statut IN ('actif', 'suspendu', 'termine')),
  prochaine_facturation DATE
);

-- ── Table factures ─────────────────────────────────────────
CREATE TABLE factures (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  numero          TEXT UNIQUE NOT NULL,
  client_id       UUID REFERENCES clients(id) ON DELETE SET NULL,
  devis_id        UUID REFERENCES devis(id) ON DELETE SET NULL,
  abonnement_id   UUID REFERENCES abonnements(id) ON DELETE SET NULL,
  statut          TEXT DEFAULT 'brouillon'
                  CHECK (statut IN ('brouillon', 'envoyee', 'payee', 'en_retard', 'annulee')),
  date_emission   DATE DEFAULT CURRENT_DATE,
  date_echeance   DATE,
  montant_ht      NUMERIC(10,2) DEFAULT 0,
  notes           TEXT,
  date_paiement   DATE
);

-- ── Table factures_lignes ──────────────────────────────────
CREATE TABLE factures_lignes (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facture_id       UUID REFERENCES factures(id) ON DELETE CASCADE NOT NULL,
  description      TEXT NOT NULL,
  quantite         NUMERIC(10,2) DEFAULT 1,
  prix_unitaire_ht NUMERIC(10,2) DEFAULT 0,
  montant_ht       NUMERIC(10,2) GENERATED ALWAYS AS (quantite * prix_unitaire_ht) STORED,
  ordre            INT DEFAULT 0
);

-- ── RLS : activer et exposer à tout utilisateur authentifié ──
ALTER TABLE clients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE devis          ENABLE ROW LEVEL SECURITY;
ALTER TABLE devis_lignes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE abonnements    ENABLE ROW LEVEL SECURITY;
ALTER TABLE factures       ENABLE ROW LEVEL SECURITY;
ALTER TABLE factures_lignes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_clients"         ON clients         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_devis"           ON devis           FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_devis_lignes"    ON devis_lignes    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_abonnements"     ON abonnements     FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_factures"        ON factures        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_factures_lignes" ON factures_lignes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Trigger updated_at ────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_clients_updated_at        BEFORE UPDATE ON clients        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_devis_updated_at          BEFORE UPDATE ON devis          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_abonnements_updated_at    BEFORE UPDATE ON abonnements    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_factures_updated_at       BEFORE UPDATE ON factures       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
