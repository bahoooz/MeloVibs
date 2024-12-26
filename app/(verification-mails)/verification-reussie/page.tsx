"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function VerificationReussie() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
      return;
    }
  }, [session, router]);


  

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Vérification réussie !</h1>
        <p className="mb-4">Votre adresse email a été vérifiée avec succès.</p>
        <p className="mb-4 underline">Vous pouvez maintenant vous connecter à votre compte.</p>
        <Button
          onClick={() => router.push("/connexion")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Se connecter
        </Button>
      </div>
    </div>
  );
}
