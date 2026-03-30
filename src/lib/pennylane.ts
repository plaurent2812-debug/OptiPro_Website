/**
 * Connecteur API Pennylane pour la création de factures.
 * Documentation : https://app.pennylane.com/api/external/v2/docs
 */

export interface PennylaneInvoiceItem {
  label: string;
  quantity: number;
  unit_price_cents: number;
  vat_rate: string; // Ex: 'FR_200' pour 20% TVA, 'FR_0' pour Auto-entrepreneur (Franchise en base)
}

export interface PennylaneInvoicePayload {
  draft: boolean;
  create_customer?: {
    name: string;
    organization_type?: string; 
    registration_number?: string; // SIRET
    emails?: string[];
    address?: string;
    postal_code?: string;
    city?: string;
  };
  invoice: {
    issue_date: string;
    due_date?: string;
    line_items: PennylaneInvoiceItem[];
  };
}

export async function createPennylaneInvoice(payload: PennylaneInvoicePayload) {
  const token = process.env.PENNYLANE_API_TOKEN;
  
  if (!token) {
    console.error("Aucune clé API Pennylane trouvée dans le fichier .env.local");
    throw new Error("Impossible de se connecter à Pennylane : clé API (PENNYLANE_API_TOKEN) manquante.");
  }

  const response = await fetch('https://app.pennylane.com/api/external/v2/customer_invoices', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erreur API Pennylane:", errorData);
    throw new Error(`Erreur Pennylane API (${response.status}): ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data;
}
