"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function SignInForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (res?.ok) {
        router.push("/");
        console.log("Connexion réussie");
      } else {
        console.error("Erreur de connexion:", res?.error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erreur de validation:", error.errors);
      } else {
        console.error("Erreur inattendue:", error);
      }
    }
  };
  return (
    <form
      className="mt-48 text-black bg-[#0F172A] rounded-2xl overflow-hidden sm:w-[500px] md:w-[600px] lg:w-fit sm:mx-auto lg:flex lg:items-stretch lg:px-12 xl:px-20 lg:py-12 xl:py-20 lg:gap-12 xl:gap-20 h-full"
      onSubmit={handleSubmit}
    >
      <Image
        src="/FormsMedia/sdm_connexion.jpg"
        alt="image sdm connexion"
        width={1284}
        height={1600}
        className="w-full lg:w-auto lg:max-w-[300px] xl:max-w-[400px] h-52 lg:h-auto object-cover object-[center_5%] rounded-2xl"
      />
      <div className="lg:py-12">
        <h1 className="text-greenColorSecondary text-center lg:text-start my-9 lg:my-0 lg:mb-12 text-2xl lg:text-5xl font-medium">
          Se connecter
        </h1>
        <div className="px-6 md:px-16 lg:px-0">
          <div className="flex flex-col gap-5">
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
          </div>
          <hr className="my-8 border-greenColorSecondary" />
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col sm:flex-row gap-5 w-full items-center">
              <Button type="submit" className="rounded-md text-white w-full">
                Se connecter
              </Button>
              <span className="uppercase text-greenColorSecondary font-mediumé">
                ou
              </span>
              <Button className="bg-white text-black w-full rounded-md px-8">
                Se connecter avec{" "}
                <Image
                  src="/FormsMedia/google_logo.png"
                  alt="google"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
            <Link
              href="/inscription"
              className="text-greenColorSecondary mb-9 lg:mb-0 text-sm underline lg:w-full lg:text-end"
            >
              Pas de compte ? En créer un
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
