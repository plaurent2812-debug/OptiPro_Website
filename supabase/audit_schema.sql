-- ============================================================
-- OptiPro — Schéma Audit System
-- Nouvelles tables pour le système d'audit client
-- ============================================================

-- ── Table audits ──────────────────────────────────────────
CREATE TABLE audits (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  client_id       UUID REFERENCES clients(id) ON DELETE SET NULL,
  
  -- Métadonnées
  date_audit      DATE DEFAULT CURRENT_DATE,
  secteur         TEXT,
  effectif        TEXT,
  ca_annuel       TEXT,
  notes_generales TEXT,
  
  -- Scores calculés
  score_global          NUMERIC(3,1) DEFAULT 0,
  score_outils          NUMERIC(3,1) DEFAULT 0,
  score_process         NUMERIC(3,1) DEFAULT 0,
  score_communication   NUMERIC(3,1) DEFAULT 0,
  score_admin           NUMERIC(3,1) DEFAULT 0,
  score_digital         NUMERIC(3,1) DEFAULT 0,
  score_automatisation  NUMERIC(3,1) DEFAULT 0,
  
  -- Statut
  statut          TEXT DEFAULT 'en_cours'
                  CHECK (statut IN ('en_cours', 'termine', 'rapport_genere', 'presente')),
  
  -- Résultats
  heures_recuperables_semaine NUMERIC(4,1) DEFAULT 0,
  
  -- Lien vers devis généré post-audit
  devis_id        UUID REFERENCES devis(id) ON DELETE SET NULL
);

-- ── Table audit_reponses ──────────────────────────────────
CREATE TABLE audit_reponses (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id        UUID REFERENCES audits(id) ON DELETE CASCADE NOT NULL,
  pilier          TEXT NOT NULL
                  CHECK (pilier IN ('outils', 'process', 'communication', 'admin', 'digital', 'automatisation')),
  question_id     TEXT NOT NULL,
  score           INT NOT NULL CHECK (score BETWEEN 1 AND 5),
  commentaire     TEXT,
  UNIQUE (audit_id, question_id)
);

-- ── Table audit_frictions ─────────────────────────────────
CREATE TABLE audit_frictions (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id        UUID REFERENCES audits(id) ON DELETE CASCADE NOT NULL,
  severite        TEXT NOT NULL CHECK (severite IN ('critical', 'warning', 'info')),
  pilier          TEXT NOT NULL,
  description     TEXT NOT NULL,
  impact_estime   TEXT,
  question_id     TEXT
);

-- ── Table audit_actions ───────────────────────────────────
CREATE TABLE audit_actions (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id        UUID REFERENCES audits(id) ON DELETE CASCADE NOT NULL,
  priorite        TEXT NOT NULL CHECK (priorite IN ('P1', 'P2', 'P3')),
  pilier          TEXT NOT NULL,
  probleme        TEXT NOT NULL,
  solution        TEXT NOT NULL,
  gain_estime     TEXT,
  complexite      TEXT CHECK (complexite IN ('simple', 'moyen', 'complexe')),
  budget_indicatif TEXT CHECK (budget_indicatif IN ('€', '€€', '€€€')),
  delai           TEXT,
  service_optipro TEXT CHECK (service_optipro IN ('creation', 'automatisation', 'les_deux')),
  ordre           INT DEFAULT 0
);

-- ── RLS ───────────────────────────────────────────────────
ALTER TABLE audits          ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reponses  ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_frictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_actions   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_audits"          ON audits          FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_audit_reponses"  ON audit_reponses  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_audit_frictions" ON audit_frictions  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_audit_actions"   ON audit_actions    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Trigger ───────────────────────────────────────────────
CREATE TRIGGER trg_audits_updated_at BEFORE UPDATE ON audits FOR EACH ROW EXECUTE FUNCTION update_updated_at();
