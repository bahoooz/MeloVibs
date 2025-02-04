"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*\-_])/,
      "Le mot de passe doit contenir au moins une majuscule, un chiffre et un symbole (!@#$%^&*)"
    )
    .max(64, "Le mot de passe ne doit pas dépasser 64 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function NewMdpContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast({
        title: "Erreur",
        description: "Token de réinitialisation manquant",
        emojis: "❌",
      });
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
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
        title: "Succès",
        description: "Votre mot de passe a été réinitialisé",
        emojis: "✅",
      });

      setTimeout(() => {
        router.push("/connexion");
      }, 2000);
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
          Réinitialiser votre mot de passe
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Entrez votre nouveau mot de passe
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              {...register("password")}
              className="w-full text-black mb-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              {...register("confirmPassword")}
              className="w-full text-black mb-2"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-greenColorSecondary hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </Button>
          <p className="text-sm text-gray-300">(NOTE: le design des pages de réinitialisation de mot de passe est en cours de développement)</p>
        </form>
      </div>
    </div>
  );
}
