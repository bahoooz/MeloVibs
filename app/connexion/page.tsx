import SignInForm from '@/components/AuthPages/SignInForm'
import React, { Suspense } from 'react'

export default function Connexion() {
  return (
    <div className="px-8 mb-40">
      <Suspense fallback={<div>Chargement...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  )
}
