import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    const isConfigured = apiKey && apiKey !== 're_...' && apiKey.length > 5;

    if (!isConfigured) {
        if (process.env.NODE_ENV === 'development') {
            console.log("⚠️ DEV MODE : Envoi d'email simulé car RESEND_API_KEY n'est pas définie.");
            const body = await request.json();
            console.log("Nouveau contact reçu silencieusement :", body);
            return NextResponse.json({ success: true, simulated: true });
        }
        
        console.error("RESEND_API_KEY is not defined or is just a placeholder.");
        return NextResponse.json({ error: "Configuration serveur manquante (Resend API)" }, { status: 500 });
    }
    
    const resend = new Resend(apiKey);
    try {
        const body = await request.json();
        const { name, company, email, phone, activity, message } = body;

        // Validation basique
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Le nom et l\'email sont requis' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact OptiPro <p.laurent@opti-pro.fr>', // Envoi depuis le nom de domaine vérifié
            to: ['p.laurent@opti-pro.fr'], // Adresse de réception principale
            replyTo: email,
            subject: `Nouveau contact OptiPro — ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
                    <h2>Nouveau contact OptiPro</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Entreprise :</strong> ${company || 'Non renseigné'}</p>
                    <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
                    <p><strong>Secteur d'activité :</strong> ${activity || 'Non renseigné'}</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
                    <p><strong>Message / Problème principal :</strong></p>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message || 'Aucun message.'}</p>
                </div>
            `,
        });

        if (error) {
            console.error("Erreur renvoyée par Resend :", error);
            return NextResponse.json(
                { error: 'Erreur Serveur Resend', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (err: unknown) {
        console.error('Erreur API Contact (catch):', err);
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        );
    }
}
