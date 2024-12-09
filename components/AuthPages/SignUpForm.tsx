"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Définir le schéma de validation avec Zod
const schema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function SignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("Inscription réussie");
      console.log(data);
      router.push("/connexion");
    } else if (res.status === 400) {
      console.log("Inscription échouée :", data.error);
    } else if (res.status === 500) {
      console.log("Erreur interne du serveur :", data.error);
    }
  };

  return (
    <form
      className="mt-48 text-black bg-[#0F172A] rounded-2xl overflow-hidden sm:w-[500px] md:w-[600px] lg:w-fit sm:mx-auto lg:flex lg:items-stretch lg:px-12 xl:px-20 lg:py-12 xl:py-20 lg:gap-12 xl:gap-20 h-full"
      onSubmit={handleSubmit}
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
          S'inscrire
        </h1>
        <div className="px-6 md:px-16 lg:px-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="name">
                Nom d'utilisateur
              </label>
              <Input
                type="text"
                placeholder="Nom d'utilisateur"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <span className="text-[#64748B] text-sm">
                Entrez votre nom d'utilisateur
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <span className="text-[#64748B] text-sm">Entrez votre email</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="password">
                Mot de passe
              </label>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <span className="text-[#64748B] text-sm">
                Entrez votre mot de passe
              </span>
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
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <span className="text-[#64748B] text-sm">
                Confirmez votre mot de passe
              </span>
            </div>
          </div>

          <hr className="my-8 border-greenColorSecondary" />

          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col sm:flex-row gap-5 w-full items-center">
              <Button type="submit" className="rounded-md text-white w-full">
                S'inscrire
              </Button>
              <span className="uppercase text-greenColorSecondary font-mediumé">
                ou
              </span>
              <Button className="bg-white text-black w-full rounded-md px-8">
                S'inscrire avec{" "}
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
