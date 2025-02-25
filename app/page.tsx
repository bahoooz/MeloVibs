import { generateMetadata } from "@/lib/metadata";
import HomeContent from "@/components/HomePage/HomeContent";

export const metadata = generateMetadata(
  "Accueil",
  "Votez pour vos morceaux préférés dans tous les genres. Une plateforme interactive pour partager vos goûts musicaux et découvrir les tendances dans nos classements évolutifs.",
  [
    "vote musique",
    "classement musical",
    "top musique",
    "plateforme musicale",
    "communauté musicale",
    "classement évolutif",
    "melovib's"
  ],
  "/Logos/icon-melovibs-512x512.png"
);

export default function Home() {
  return <HomeContent />;
}
