import { Suspense } from "react";
import NewMdpContent from "@/components/ResetMdpPage/NewMdpContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Nouveau mot de passe",
  "Changez votre mot de passe pour accéder à votre compte MeloVib's.",
  [
    "nouveau mot de passe",
    "nouveau mot de passe melovib's",
    "melovib's",
    "inscription",
    "connexion",
    "compte"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function NouveauMotDePasse() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <NewMdpContent />
    </Suspense>
  );
}