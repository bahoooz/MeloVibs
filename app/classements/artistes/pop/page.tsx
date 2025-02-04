import PopContent from "@/components/classements/ContentForArtists/PopContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes Pop",
  "Découvrez les meilleurs artistes Pop. Votez pour vos artistes préférés et suivez les tendances de la musique pop.",
  [
    "pop",
    "musique pop",
    "top pop",
    "classement pop",
    "meilleurs artistes pop",
    "pop pop",
    "hits pop",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function Pop() {
  return <PopContent />;
}