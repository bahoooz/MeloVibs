import ResetMdpContent from "@/components/ResetMdpPage/ResetMdpContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Réinitialiser son mot de passe",
  "Réinitialisez votre mot de passe pour accéder à votre compte MeloVib's.",
  [
    "réinitialiser mot de passe",
    "réinitialiser mot de passe melovib's",
    "melovib's",
    "inscription",
    "connexion",
    "compte"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function ReinitialisationMotDePasse() {
  return <ResetMdpContent />;
}
