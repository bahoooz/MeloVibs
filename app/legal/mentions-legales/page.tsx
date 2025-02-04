import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Mentions Légales",
  "Consultez les mentions légales de MeloVib's.",
  [
    "mentions légales",
    "ml melovib's",
    "melovib's",
    "ml"
  ],
);

export default function MentionsLegales() {
  return (
    <div className="min-h-screen px-8 mt-48 lg:mt-52 xl:mt-56 sm:mx-auto sm:max-w-[550px] lg:max-w-[700px]">
      <h1 className="text-2xl mb-8 underline">Mentions Légales</h1>
      <ol className="list-decimal flex flex-col gap-5">
        <li>
          <span className="font-bold">Responsable de la publication :</span>{" "}
          MeloVib&apos;s Team <br />
          <span className="font-bold">Hébergeur :</span> Vercel, 340 S Lemon Ave
          #4133, Walnut, CA 91789, États-Unis <br />
          <span className="font-bold">Contact :</span> contact@melovibs.com
        </li>
        <li>
          <span className="font-bold">Propriété intellectuelle :</span> Le
          contenu de ce site, y compris les textes, images et logos, est protégé
          par le droit d&apos;auteur. Toute reproduction, totale ou partielle, est
          interdite sans autorisation préalable.
        </li>
        <li>
          Le site MeloVib&apos;s est un projet personnel géré par un
          micro-entrepreneur enregistré en France sous le statut de
          micro-entreprise. Le numéro SIRET est disponible sur demande en cas de
          besoin légal.
        </li>

        <li>
          Pour toute question ou demande, veuillez nous contacter à l&apos;adresse
          mentionnée ci-dessus.
        </li>
        <li>
          Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour
          la confiance dans l&apos;économie numérique, ces mentions légales indiquent
          l&apos;identité des responsables de ce site web.
        </li>
      </ol>
    </div>
  );
}
