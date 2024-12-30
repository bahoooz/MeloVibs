export default function PolitiqueDeConfidentialite() {
  return (
    <div className="min-h-screen px-8 mt-48 lg:mt-52 xl:mt-56 sm:mx-auto sm:max-w-[550px] lg:max-w-[700px]">
      <h1 className="text-2xl mb-8 underline">Politique de Confidentialité</h1>
      <div className="flex flex-col gap-8">
        <p>
          <span className="font-bold">Introduction :</span> La protection de vos
          données personnelles est une priorité pour MeloVib&apos;s. Nous nous
          engageons à respecter votre vie privée et à protéger les informations
          que vous nous confiez.
        </p>
        <p>
          <span className="font-bold">Données collectées :</span> Nous collectons
          les informations suivantes :
        </p>{" "}
        <ul className="list-disc flex flex-col gap-5">
          <li>Adresse email</li>
          <li>Nom d&apos;utilisateur (ou pseudonyme)</li>
          <li>Données liées à l&apos;utilisation du site (votes, votes restants)</li>
        </ul>
        <p>
          Ces données sont uniquement utilisées dans le cadre des
          fonctionnalités de MeloVib&apos;s. Elles ne sont ni vendues ni partagées
          avec des tiers. Le responsable de ces données est Bahoz.
        </p>
        <p>
          <span className="font-bold">Durée de conservation :</span> Vos données
          sont conservées tant que votre compte est actif. Vous pouvez demander
          leur suppression à tout moment en nous contactant à l&apos;adresse{" "}
          <span className="font-bold">noreply@melovibs.com</span>.
        </p>
        <p>
          <span className="font-bold">Vos droits :</span> Conformément au
          Règlement Général sur la Protection des Données (RGPD), vous avez les
          droits suivants :
        </p>
        <ul className="list-disc flex flex-col gap-5">
          <li>Accès à vos données</li>
          <li>Rectification de vos données</li>
          <li>Suppression de vos données</li>
          <li>Opposition au traitement de vos données</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à l&apos;adresse suivante :{" "}
          <span className="font-bold">noreply@melovibs.com</span>.
        </p>
        <p>
          Nous prévoyons d’introduire un système de points et une boutique
          prochainement. Ces fonctionnalités ne sont pas encore disponibles. Une
          mise à jour de la politique de confidentialité sera effectuée à leur
          introduction.
        </p>
      </div>
    </div>
  );
}
