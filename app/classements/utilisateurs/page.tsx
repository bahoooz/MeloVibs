import TopUsersContent from "@/components/classements/ContentForTopUsers/TopUsersContent";
import { generateMetadata } from "@/lib/metadata";
import React from "react";

export const metadata = generateMetadata(
  "Legends Hall",
  "Votez pour vos morceaux préférés dans tous les genres. Une plateforme interactive pour partager vos goûts musicaux et découvrir les tendances dans nos classements évolutifs.",
  [
    "vote musique",
    "classement musical",
    "top musique",
    "plateforme musicale",
    "communauté musicale",
    "classement évolutif",
    "melovib's",
    "legends hall",
    "top users",
    "top users melovib's",
    "classement utilisateurs",
    "classement utilisateurs melovib's",
    "top 10 utilisateurs",
    "top 10 utilisateurs melovib's"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function ClassementUtilisateurs() {
  return (
    <div className="mt-48 lg:mt-52 xl:mt-56">
      <TopUsersContent />
    </div>

  );
}
