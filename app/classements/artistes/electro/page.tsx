import ElectroContent from "@/components/classements/ContentForArtists/ElectroContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement artistes Electro",
  "Découvrez les meilleurs artistes Electro. Votez pour vos artistes préférés et suivez les tendances de la musique électro.",
  [
    "electro",
    "musique électro",
    "top electro",
    "classement electro",
    "meilleurs artistes electro",
    "electro pop",
    "hits electro",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Electro() {
  return <ElectroContent />;
}