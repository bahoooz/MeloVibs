import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify((err, _success) => {
  if (err) {
    console.log("Erreur de connexion SMTP :", err);
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);
  } else {
    console.log("Connexion SMTP réussie !");
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);
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
    // Lire le template HTML
    const templatePath = path.join(process.cwd(), 'lib', 'newsletter-template.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const mailOptions = {
      from: "noreply@melovibs.com",
      to: "Phantomz53530@gmail.com",
      subject: 'Test Newsletter MeloVibs v1.2',
      html: template
    };

    await transporter.sendMail(mailOptions);
    console.log("Newsletter de test envoyée avec succès !");
    
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter de test:", error);
    throw error;
  }
};
