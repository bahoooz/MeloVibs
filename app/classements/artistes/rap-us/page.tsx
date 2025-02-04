import RapUsContent from "@/components/classements/ContentForArtists/RapUsContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes Rap US",
  "Découvrez les meilleurs artistes Rap US. Votez pour vos artistes préférés et suivez les tendances de la musique Rap US.",
  [
    "rap us",
    "musique rap us",
    "top rap us",
    "classement rap us",
    "meilleurs artistes rap us",
    "rap us pop",
    "hits rap us",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function RapUs() {
  return <RapUsContent />;
}