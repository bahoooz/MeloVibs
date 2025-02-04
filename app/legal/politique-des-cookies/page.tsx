import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Politique des Cookies",
  "Consultez la politique des cookies de MeloVib's.",
  [
    "politique des cookies",
    "pc melovib's",
    "melovib's",
    "pc"
  ],
);

export default function PolitiqueDesCookies() {
  return (
    <div className="min-h-screen px-8 mt-48 lg:mt-52 xl:mt-56 sm:mx-auto sm:max-w-[550px] lg:max-w-[700px]">
      <h1 className="text-2xl mb-8 underline">Politique des Cookies</h1>
      <p>
        MeloVib&apos;s utilise des cookies et des technologies similaires pour améliorer 
        l&apos;expérience utilisateur et analyser le trafic sur le site. 
      </p>
      
      <h2 className="text-xl mt-6 mb-4">Quels cookies utilisons-nous ?</h2>
      <ul className="list-disc pl-5">
        <li>
          <strong>Cookies analytiques :</strong> Nous utilisons 
          <a href="https://analytics.google.com/" target="_blank" className="text-blue-500"> Google Analytics</a> et 
          <a href="https://vercel.com/analytics" target="_blank" className="text-blue-500"> Vercel Analytics </a> 
          pour suivre le trafic sur notre site et mieux comprendre les comportements des utilisateurs. 
        </li>
      </ul>

      <h2 className="text-xl mt-6 mb-4">En savoir plus</h2>
      <p>
        Pour plus d&apos;informations sur notre utilisation des cookies, vous pouvez nous contacter via 
        notre formulaire de contact ou consulter la 
        <a href="/legal/mentions-legales" className="text-blue-500"> page Mentions Légales</a>.
      </p>
    </div>
  );
}
