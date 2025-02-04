import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Conditions Générales d'Utilisation",
  "Consultez les conditions générales d'utilisation de MeloVib's.",
  [
    "conditions générales d'utilisation",
    "cgu melovib's",
    "melovib's",
    "cgu"
  ],
);

export default function ConditionsGeneralesUtilisation() {
  return (
    <div className="min-h-screen px-8 mt-48 lg:mt-52 xl:mt-56 sm:mx-auto sm:max-w-[550px] lg:max-w-[700px]">
      <h1 className="text-2xl mb-8 underline">Conditions Générales d&apos;Utilisation (CGU)</h1>
      <ol className="list-decimal flex flex-col gap-5">
        <li>
          <span className="font-bold">Objet :</span> MeloVib&apos;s est une plateforme permettant aux utilisateurs de
          voter pour leurs musiques préférées et de cumuler des points.
          L&apos;inscription et l&apos;utilisation de la plateforme impliquent
          l&apos;acceptation de ces CGU.
        </li>
        <li>
          <span className="font-bold">Règles d&apos;utilisation :</span> Les utilisateurs doivent s&apos;engager à fournir des
          informations véridiques lors de leur inscription. Les comportements
          suivants sont strictement interdits : Utilisation de bots ou de
          scripts automatisés pour voter. Création de pseudonymes à caractère
          haineux, raciste ou discriminatoire. Tentative de fraude dans le
          système de points ou de votes.
        </li>
        <li>
          <span className="font-bold">Points et boutique :</span> Un système de points sera introduit prochainement.
          Les points pourront être obtenus uniquement via des actions gratuites
          (par exemple, en votant). La boutique et les récompenses ne sont pas
          encore actives. Les détails et règles concernant les points seront
          publiés une fois ces fonctionnalités disponibles. Les récompenses
          disponibles (comme les codes promos) sont soumises à la disponibilité
          des partenariats avec nos marques associées.
        </li>

        <li>
          <span className="font-bold">Responsabilité :</span> MeloVib&apos;s ne pourra être tenu responsable de : La perte
          de points en cas de bug technique. L&apos;indisponibilité temporaire de la
          plateforme.
        </li>
      </ol>
    </div>
  );
}
