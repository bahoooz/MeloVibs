"use client";

import React from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

// Définir le schéma de validation avec Zod
const schema = z
  .object({
    name: z
      .string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(30, "Le nom ne doit pas dépasser 30 caractères"),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Veuillez entrer un email valide")
      .max(96, "L'email ne doit pas dépasser 96 caractères"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*\-_])/,
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et un symbole (!@#$%^&*)"
      )
      .max(64, "Le mot de passe ne doit pas dépasser 64 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"], // Ceci indique sur quel champ l'erreur doit s'afficher
  });

// Définir le type à partir du schéma
type FormData = z.infer<typeof schema>;

export default function SignUpForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const res = await fetch("api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const responseData = await res.json();

    if (res.ok) {
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
        emojis: "✔️",
      });
      console.log("Inscription réussie");
      console.log(responseData);
      router.push("/connexion");
    } else if (res.status === 400) {
      toast({
        title: "Erreur",
        description: responseData.error,
        emojis: "❌",
      });
      console.log("Inscription échouée :", responseData.error);
    } else if (res.status === 500) {
      toast({
        title: "Erreur",
        description: "Erreur interne du serveur",
        emojis: "❌",
      });
      console.log("Erreur interne du serveur :", responseData.error);
    }
  };

  return (
    <form
      className="mt-48 text-black bg-[#0F172A] rounded-2xl overflow-hidden sm:w-[500px] md:w-[600px] lg:w-fit sm:mx-auto lg:flex lg:items-stretch lg:px-12 xl:px-20 lg:py-12 xl:py-20 lg:gap-12 xl:gap-20 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        src="/FormsMedia/pnl_inscription.jpg"
        alt="image pnl inscription"
        width={675}
        height={1200}
        className="w-full lg:w-auto lg:max-w-[300px] xl:max-w-[400px] h-52 lg:h-auto object-cover object-[center_30%] rounded-2xl"
      />
      <div className="lg:py-12">
        <h1 className="text-greenColorSecondary text-center lg:text-start my-9 lg:my-0 lg:mb-12 text-2xl lg:text-5xl font-medium">
          S&apos;inscrire
        </h1>
        <div className="px-6 md:px-16 lg:px-0">
          <div className="flex flex-col gap-5 lg:max-w-[344.39px]">
            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="name">
                Nom d&apos;utilisateur{" "}
                <span className="opacity-80 text-sm">(définitif)</span>
              </label>
              <Input
                type="text"
                placeholder="Nom d'utilisateur"
                {...register("name")}
              />
              {errors.name ? (
                <span className="text-red-400 text-sm">
                  {errors.name.message}
                </span>
              ) : (
                <span className="text-[#64748B] text-sm">
                  Entrez votre nom d&apos;utilisateur
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="email">
                Email
              </label>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email ? (
                <span className="text-red-400 text-sm">
                  {errors.email.message}
                </span>
              ) : (
                <span className="text-[#64748B] text-sm">
                  Entrez votre email
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
              />
              {errors.password ? (
                <span className="text-red-400 text-sm">
                  {errors.password.message}
                </span>
              ) : (
                <span className="text-[#64748B] text-sm">
                  Entrez votre mot de passe
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-greenColorSecondary"
                htmlFor="confirmPassword"
              >
                Confirmer le mot de passe
              </label>
              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <span className="text-red-400 text-sm">
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <span className="text-[#64748B] text-sm">
                  Confirmez votre mot de passe
                </span>
              )}
            </div>
          </div>

          <hr className="my-8 border-greenColorSecondary" />

          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col sm:flex-row gap-5 w-full items-center">
              <Button type="submit" className="rounded-md text-white w-full">
                S&apos;inscrire
              </Button>
              <span className="uppercase text-greenColorSecondary font-mediumé">
                ou
              </span>
              <Button className="bg-white text-black w-full rounded-md px-8">
                S&apos;inscrire avec{" "}
                <Image
                  src="/FormsMedia/google_logo.png"
                  alt="google"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
            <Link
              href="/connexion"
              className="text-greenColorSecondary mb-9 lg:mb-0 text-sm underline lg:w-full lg:text-end"
            >
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
