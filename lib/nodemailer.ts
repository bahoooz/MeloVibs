import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Vérification de votre adresse email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Vérification de votre email</h2>
        <p>Merci de vous être inscrit ! Pour vérifier votre adresse email, veuillez cliquer sur le lien ci-dessous :</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Vérifier mon email
        </a>
        <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
        <p>${verificationLink}</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
