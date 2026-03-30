'use client'

import { useState, useActionState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../clients/clients.module.css'
import { createDevisAction } from '../actions'
import { createClient } from '@/lib/supabase/client'
import { formatMontant } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

type ClientOption = { id: string; prenom: string | null; nom: string; entreprise: string | null }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? <span className={styles.spinner} /> : 'Générer le devis'}
    </button>
  )
}

export default function NewDevisPage() {
  const [state, formAction] = useActionState(createDevisAction, null)
  const [clients, setClients] = useState<ClientOption[]>([])
  
  // Builder State
  const [lignes, setLignes] = useState([
    { id: '1', description: 'Développement Web All-in (NextJS/Supabase)', quantite: 1, unite: 'forfait', prix: 1500 }
  ])

  useEffect(() => {
    // Charge les clients disponibles côté client pour le dropdown
    const fetchClients = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('clients').select('id, prenom, nom, entreprise').order('nom')
      if (data) setClients(data as ClientOption[])
    }
    fetchClients()
  }, [])

  const addLigne = () => {
    setLignes([
      ...lignes, 
      { id: Date.now().toString(), description: '', quantite: 1, unite: 'forfait', prix: 0 }
    ])
  }

  const removeLigne = (id: string) => {
    if (lignes.length === 1) return // Doit garder au moins une ligne
    setLignes(lignes.filter(l => l.id !== id))
  }

  const updateLigne = (id: string, field: string, value: string | number) => {
    setLignes(lignes.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  const totalHT = lignes.reduce((acc, ligne) => acc + (ligne.prix * ligne.quantite), 0)

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/devis" className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Retour aux devis
          </Link>
          <h1 className={styles.title}>Nouveau Devis</h1>
          <p className={styles.subtitle}>Générez une proposition commerciale et ajustez le chiffrage.</p>
        </div>
      </div>

      <div className={styles.card}>
        <form action={formAction} style={{ padding: '2rem' }}>
          
          {state?.error && (
            <div className={styles.errorBanner} style={{ marginBottom: '1.5rem' }}>
              {state.error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Sélection du Client */}
            <div className={styles.formGroup} style={{ maxWidth: '400px' }}>
              <label htmlFor="client_id" className={styles.label}>Sélectionnez un Client <span style={{ color: '#EF4444' }}>*</span></label>
              <select id="client_id" name="client_id" className={styles.select} required defaultValue="">
                <option value="" disabled>-- Choisir dans la liste --</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.nom} {client.prenom} {client.entreprise ? `(${client.entreprise})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Lignes de facturation dynamique */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Lignes de Prestation</h3>
                <button type="button" onClick={addLigne} className={styles.actionBtn}>
                  + Ajouter une ligne
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {lignes.map((ligne, index) => (
                  <div key={ligne.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 2fr) 100px 120px 120px 40px', gap: '1rem', alignItems: 'end', background: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Description</label>
                      <input type="text" name={`lignes[${index}][description]`} required value={ligne.description} onChange={e => updateLigne(ligne.id, 'description', e.target.value)} className={styles.input} placeholder="Ex: Audit UX/UI" />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Qté</label>
                      <input type="number" name={`lignes[${index}][quantite]`} step="0.5" required min="0" value={ligne.quantite} onChange={e => updateLigne(ligne.id, 'quantite', parseFloat(e.target.value))} className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Unité</label>
                      <select name={`lignes[${index}][unite]`} value={ligne.unite} onChange={e => updateLigne(ligne.id, 'unite', e.target.value)} className={styles.select}>
                        <option value="forfait">Forfait</option>
                        <option value="jour">Jour</option>
                        <option value="heure">Heure</option>
                        <option value="mois">Mois</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Prix Un. HT</label>
                      <input type="number" name={`lignes[${index}][prix_unitaire_ht]`} step="1" required min="0" value={ligne.prix} onChange={e => updateLigne(ligne.id, 'prix', parseFloat(e.target.value))} className={styles.input} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
                      <button 
                        type="button" 
                        onClick={() => removeLigne(ligne.id)} 
                        disabled={lignes.length === 1}
                        style={{ color: lignes.length === 1 ? '#D1D5DB' : '#DC2626', background: 'none', border: 'none', cursor: lignes.length === 1 ? 'not-allowed' : 'pointer', fontSize: '1.2rem'}}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <div style={{ textAlign: 'right', background: '#F3F4F6', padding: '1rem 2rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <div style={{ color: '#4B5563', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Total Devis</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>
                  {formatMontant(totalHT)} <small style={{ fontSize: '60%', color: '#6B7280' }}>HT</small>
                </div>
                {/* Note: Auto-entrepreneur => Pas de TVA */}
                <span className={styles.badge} style={{ marginTop: '0.5rem', background: '#E0E7FF' }}>TVA non applicable</span>
              </div>
            </div>

            {/* Notes publiques */}
            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.label}>Conditions sur le devis (Notes légales, modalités etc)</label>
              <textarea id="notes" name="notes" className={styles.textarea} defaultValue={"\nCe devis est valable 30 jours à compter de sa date d'émission.\nAcompte de 30% requis à la signature."}></textarea>
            </div>

          </div>

          <div className={styles.formActions}>
            <Link href="/admin/devis" className={styles.secondaryBtn}>Annuler</Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
