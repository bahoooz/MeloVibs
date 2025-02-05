"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NewsletterUnsubscribeSuccess() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Désabonnement réussi !</h1>
        <p className="mb-4">
          Vous avez été désabonné avec succès de notre newsletter. 
          Vous ne recevrez plus nos communications par email.
        </p>
        <p className="mb-4">
          Si vous changez d&apos;avis, vous pourrez toujours vous réabonner depuis votre profil.
        </p>
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
