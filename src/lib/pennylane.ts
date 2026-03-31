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

export interface PennylaneCustomerPayload {
  customer_type: 'company' | 'individual';
  name: string;
  emails?: string[];
  registration_number?: string;
  billing_address?: {
    address?: string;
    postal_code?: string;
    city?: string;
    country_alpha2?: 'FR' | string;
  }
}

export async function createPennylaneCustomer(payload: PennylaneCustomerPayload) {
  const token = process.env.PENNYLANE_API_TOKEN;
  if (!token) throw new Error("Clé API Pennylane manquante.");

  const endpoint = payload.customer_type === 'company' 
    ? 'https://app.pennylane.com/api/external/v2/company_customers'
    : 'https://app.pennylane.com/api/external/v2/individual_customers';

  const { customer_type, registration_number, ...requestBody } = payload;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Erreur création client Pennylane:", errorData);
    throw new Error(`Erreur API Client V2 (${response.status}): ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

export interface PennylaneQuoteLineItem {
  label: string;
  quantity: number;
  unit_price_cents: number;
  vat_rate: string;
}

export interface PennylaneQuotePayload {
  customer_id: string;
  date: string;
  expiry_date?: string;
  line_items_attributes: PennylaneQuoteLineItem[];
}

export async function createPennylaneQuote(payload: PennylaneQuotePayload) {
  const token = process.env.PENNYLANE_API_TOKEN;
  if (!token) throw new Error("Clé API Pennylane manquante.");

  const response = await fetch('https://app.pennylane.com/api/external/v2/quotes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Erreur création devis Pennylane:", errorData);
    throw new Error(`Erreur API Devis (${response.status}): ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}
