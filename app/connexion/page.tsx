import SignInForm from '@/components/AuthPages/SignInForm'
import { generateMetadata } from '@/lib/metadata';
import React, { Suspense } from 'react'

export const metadata = generateMetadata(
  "Connexion",
  "Votez pour vos morceaux préférés dans tous les genres. Une plateforme interactive pour partager vos goûts musicaux et découvrir les tendances dans nos classements évolutifs.",
  [
    "vote musique",
    "classement musical",
    "top musique",
    "plateforme musicale",
    "communauté musicale",
    "classement évolutif",
    "melovib's",
    "connexion",
    "inscription",
    "compte"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Connexion() {
  return (
    <div className="px-8 mb-40">
      <Suspense fallback={<div>Chargement...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  )
}
