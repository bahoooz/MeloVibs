"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NewsletterErreurContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Une erreur est survenue</h1>
        <p className="mb-4">{message || "Une erreur inattendue s'est produite."}</p>
        <Button
          onClick={() => router.push("/")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}

export default function NewsletterErreur() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <NewsletterErreurContent />
    </Suspense>
  );
}