import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import connectDb from './mongodb';
import User from '../models/user';
import crypto from 'crypto';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: "noreply@melovibs.com",
    to: email,
    subject: 'Vérification de votre adresse email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Vérification de votre email</h2>
        <p>🎊 Toute l'équipe de MeloVib's vous remercie chaleureusement d'avoir rejoint l'aventure musicale ! <br /> Pour vérifier votre adresse email, veuillez cliquer sur le lien ci-dessous :</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #28CB62; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Vérifier mon email
        </a>
        <p style="text-underline">Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
        <p>${verificationLink}</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/nouveau-mot-de-passe?token=${token}`;

  const mailOptions = {
    from: "noreply@melovibs.com",
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Réinitialisation de votre mot de passe</h2>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Réinitialiser mon mot de passe
        </a>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  
};

export const sendNewsletterTest = async () => {
  try {
    // Connexion à la base de données et récupération de l'utilisateur
    await connectDb();
    const user = await User.findOne({ 
      email: "bahoz.coding@gmail.com",
      isSubscribedToNewsletter: true 
    });
    
    // Si l'utilisateur n'est pas abonné, on arrête l'envoi
    if (!user) {
      console.log("L'utilisateur n'est pas abonné à la newsletter ou n'existe pas");
      return;
    }

    const templatePath = path.join(process.cwd(), 'lib', 'newsletter-rappel-vote.html');
    let template = fs.readFileSync(templatePath, 'utf-8');
    
    // Créer un vrai token de désabonnement
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');
    const unsubscribeLink = `${process.env.NEXTAUTH_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}&email=bahoz.coding@gmail.com`;
    
    template = template
      .replace('[Prénom]', user?.name || '')
      .replace('Se désabonner de la newsletter', `<a href="${unsubscribeLink}" style="color: #333333; text-decoration: underline;">Se désabonner de la newsletter</a>`);

    const mailOptions = {
      from: "noreply@melovibs.com",
      to: "bahoz.coding@gmail.com",
      subject: 'N\'oublie pas de voter - TheWeeknd, Lacrim et Alonzo ont sorti leur album ! 🎉',
      html: template
    };

    // Sauvegarder le token dans la base de données
    await User.findByIdAndUpdate(user._id, {
      newsletterUnsubscribeToken: unsubscribeToken
    });

    await transporter.sendMail(mailOptions);
    console.log("Newsletter de test envoyée avec succès !");
    
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter de test:", error);
    throw error;
  }
};

// Ajouter un délai entre chaque envoi
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendNewsletterToAllUsers = async () => {
  try {
    await connectDb();
    const users = await User.find({ 
      isSubscribedToNewsletter: true 
    }, 'email name');
    
    const DELAY_BETWEEN_EMAILS = 2000; // 2 secondes entre chaque envoi
    const BATCH_SIZE = 50; // Nombre d'emails par lot
    const DELAY_BETWEEN_BATCHES = 60000; // 1 minute de pause entre les lots

    // Diviser les utilisateurs en lots
    const batches = [];
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      batches.push(users.slice(i, i + BATCH_SIZE));
    }

    let totalSuccessful = 0;
    let totalFailed = 0;
    const failedEmails = [];

    // Traiter chaque lot
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      
      // Traiter chaque utilisateur dans le lot
      for (const user of batch) {
        try {
          const unsubscribeToken = crypto.randomBytes(32).toString('hex');
          const unsubscribeLink = `${process.env.NEXTAUTH_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}&email=${encodeURIComponent(user.email)}`;
          
          const templatePath = path.join(process.cwd(), 'lib', 'newsletter-rappel-vote.html');
          const templateBase = fs.readFileSync(templatePath, 'utf-8');
          
          const template = templateBase
            .replace('[Prénom]', user.name || '')
            .replace('Se désabonner de la newsletter', `<a href="${unsubscribeLink}" style="color: #333333; text-decoration: underline;">Se désabonner de la newsletter</a>`);

          const mailOptions = {
            from: "noreply@melovibs.com",
            to: user.email,
            subject: 'N\'oublie pas de voter - TheWeeknd, Lacrim et Alonzo ont sorti leur album ! 🎉',
            html: template
          };

          await User.findByIdAndUpdate(user._id, {
            newsletterUnsubscribeToken: unsubscribeToken
          });

          await transporter.sendMail(mailOptions);
          totalSuccessful++;
          
          // Attendre entre chaque email
          await delay(DELAY_BETWEEN_EMAILS);
          
        } catch (error) {
          console.error(`Échec d'envoi pour ${user.email}:`, error);
          totalFailed++;
          failedEmails.push({ email: user.email, error: error instanceof Error ? error.message : String(error) });
        }
      }

      // Si ce n'est pas le dernier lot, attendre avant le prochain lot
      if (batchIndex < batches.length - 1) {
        console.log(`Pause de ${DELAY_BETWEEN_BATCHES/1000} secondes avant le prochain lot...`);
        await delay(DELAY_BETWEEN_BATCHES);
      }
    }

    return {
      successful: totalSuccessful,
      failed: totalFailed,
      failedEmails,
      totalProcessed: users.length
    };
    
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter:", error);
    throw error;
  }
};
