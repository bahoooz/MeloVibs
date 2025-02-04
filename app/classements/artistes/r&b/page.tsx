import RnBContent from "@/components/classements/ContentForArtists/R&BContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes R&B",
  "Découvrez les meilleurs artistes R&B. Votez pour vos artistes préférés et suivez les tendances de la musique R&B.",
  [
    "r&b",
    "musique r&b",
    "top r&b",
    "classement r&b",
    "meilleurs artistes r&b",
    "r&b pop",
    "hits r&b",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function RnB() {
  return <RnBContent />;
}