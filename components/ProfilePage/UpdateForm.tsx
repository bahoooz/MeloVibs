"use client";

import React from "react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide")
    .max(96, "L'email ne doit pas dépasser 96 caractères"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .refine((val) => !val || /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*\-_])/.test(val), {
      message: "Le mot de passe doit contenir au moins une majuscule, un chiffre et un symbole (!@#$%^&*)",
    })
    .refine((val) => !val || val.length <= 64, {
      message: "Le mot de passe ne doit pas dépasser 64 caractères",
    }),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function UpdateForm() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: session?.user?.email || "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password || undefined,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Échec de la mise à jour des données");
      }

      reset({ 
        email: formData.email,
        password: "",
        confirmPassword: "" 
      });
      
      toast({
        title: "Changements effectués",
        description: "Profil mis à jour avec succès",
        emojis: "✔️",
      });

    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
        emojis: "❌",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 xl:w-full xl:mt-8">
      <div className="flex flex-col gap-2">
        <label className="text-greenColorSecondary" htmlFor="email">
          Email
        </label>
        <Input
          type="email"
          placeholder="Adresse email"
          {...register("email")}
          className="text-black"
        />
        {errors.email ? (
          <span className="text-red-400 text-sm">{errors.email.message}</span>
        ) : (
          <span className="text-[#64748B] text-sm">
            Modifiez votre adresse email
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-greenColorSecondary" htmlFor="password">
          Mot de passe
        </label>
        <Input
          type="password"
          placeholder="Mot de passe"
          {...register("password")}
          className="text-black"
        />
        {errors.password ? (
          <span className="text-red-400 text-sm">{errors.password.message}</span>
        ) : (
          <span className="text-[#64748B] text-sm">
            Modifiez votre mot de passe
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-greenColorSecondary" htmlFor="confirmPassword">
          Confirmer le mot de passe
        </label>
        <Input
          type="password"
          placeholder="Confirmation du mot de passe"
          {...register("confirmPassword")}
          className="text-black"
        />
        {errors.confirmPassword ? (
          <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>
        ) : (
          <span className="text-[#64748B] text-sm">
            Confirmez votre mot de passe
          </span>
        )}
      </div>

      <Button className="rounded-md mt-4 xl:absolute right-12 bottom-8 xl:px-8" type="submit">
        Mettre à jour
      </Button>
    </form>
  );
}
