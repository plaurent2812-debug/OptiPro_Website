import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not defined");
        return NextResponse.json({ error: "Configuration serveur manquante" }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const body = await request.json();
        const { name, company, email, phone, activity, chantiers, plan, message } = body;

        // Validation basique
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Le nom et l\'email sont requis' },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: 'OptiBoard Contact <onboarding@resend.dev>', // Par défaut avec l'essai Resend. Il faudra vérifier le domaine sur Resend pour utiliser une adresse personnalisée.
            to: ['contact@optipro.fr'], // Ton adresse de réception
            replyTo: email,
            subject: `Nouvelle demande OptiBoard : ${company || name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
                    <h2>Nouvelle demande de contact OptiBoard</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Entreprise :</strong> ${company || 'Non renseigné'}</p>
                    <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
                    <p><strong>Métier :</strong> ${activity || 'Non renseigné'}</p>
                    <p><strong>Chantiers/mois :</strong> ${chantiers || 'Non renseigné'}</p>
                    <p><strong>Plan envisagé :</strong> ${plan || 'Non renseigné'}</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
                    <p><strong>Message / Problème principal :</strong></p>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message || 'Aucun message.'}</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Erreur API Contact:', error);
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        );
    }
}
