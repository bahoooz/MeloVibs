import SignUpForm from "@/components/AuthPages/SignUpForm";
import { generateMetadata } from "@/lib/metadata";
import React from "react";

export const metadata = generateMetadata(
  "Inscription",
  "Votez pour vos morceaux préférés dans tous les genres. Une plateforme interactive pour partager vos goûts musicaux et découvrir les tendances dans nos classements évolutifs.",
  [
    "vote musique",
    "classement musical",
    "top musique",
    "plateforme musicale",
    "communauté musicale",
    "classement évolutif",
    "melovib's",
    "inscription",
    "connexion",
    "compte"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Inscription() {
  return (
    <div className="px-8 mb-40">
      <SignUpForm />
    </div>
  );
}
