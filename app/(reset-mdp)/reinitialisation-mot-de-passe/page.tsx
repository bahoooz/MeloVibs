"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ReinitialisationMotDePasse() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Erreur",
          description: result.error,
          emojis: "❌",
        });
        return;
      }

      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception",
        emojis: "✉️",
      });

      // Redirection vers la page de connexion après 2 secondes
      setTimeout(() => {
        router.push("/connexion");
      }, 5000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue : " + error,
        emojis: "❌",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Mot de passe oublié ?
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
          <div>
            <Input
              type="email"
              placeholder="Votre email"
              {...register("email")}
              className="w-full text-black mb-2"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-greenColorSecondary hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
          </Button>
          <p className="text-sm text-gray-300">(NOTE: le design des pages de réinitialisation de mot de passe est en cours de développement)</p>
        </form>
      </div>
    </div>
  );
}
