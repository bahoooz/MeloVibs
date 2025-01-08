"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { CircleNotch } from "@phosphor-icons/react";

const schema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide")
    .max(96, "L'email ne doit pas dépasser 96 caractères"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type FormData = z.infer<typeof schema>;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  useEffect(() => {
    if (verified) {
      toast({
        title: "Email vérifié avec succès !",
        description: "Vous pouvez maintenant vous connecter.",
        emojis: "✔️",
      });
    }
  }, [verified, toast]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Erreur",
          description: "Email ou mot de passe incorrect",
          emojis: "❌",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
        emojis: "✔️",
      });

      if (verified) {
        router.push("/verification-reussie");
      } else {
        router.push("/");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue : " + error,
        emojis: "❌",
      });
    }
  };

  return (
    <form
      className="mt-48 text-black bg-[#0F172A] rounded-2xl overflow-hidden sm:w-[500px] md:w-[600px] lg:w-fit sm:mx-auto lg:flex lg:items-stretch lg:px-12 xl:px-20 lg:py-12 xl:py-20 lg:gap-12 xl:gap-20 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        priority
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
          </div>
          <hr className="my-8 border-greenColorSecondary" />
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col sm:flex-row gap-5 w-full items-center">
              <Button type="submit" className="rounded-md text-white w-full lg:min-w-[136.578px]" disabled={isLoading}>
                {isLoading ? <CircleNotch className="animate-spin" /> : "Se connecter"}
              </Button>
              <span className="uppercase text-greenColorSecondary font-mediumé">
                ou
              </span>
              <Button
                type="button"
                onClick={async () => {
                  try {
                    // Déclencher la connexion Google avec redirection
                    await signIn("google", {
                      callbackUrl: "/", // URL de redirection après succès
                    });

                    // Note: Le code après signIn ne sera pas exécuté immédiatement
                    // car l'utilisateur sera redirigé vers Google
                  } catch (error) {
                    toast({
                      title: "Erreur",
                      description:
                        "Une erreur est survenue lors de la connexion : " + error,
                      emojis: "❌",
                    });
                  }
                }}
                className="bg-white text-black w-full rounded-md px-8"
              >
                Se connecter avec{" "}
                <Image
                  src="/FormsMedia/google_logo.png"
                  alt="google"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
            <div className="flex flex-row-reverse justify-between items-start gap-4 lg:gap-10 w-full">
              <Link
                href="/inscription"
                className="text-greenColorSecondary text-sm underline text-end lg:w-fit"
              >
                Pas de compte ? En créer un
              </Link>
              <Link
                href="/reinitialisation-mot-de-passe"
                className="text-greenColorSecondary mb-9 lg:mb-0 text-sm underline lg:w-fit lg:min-w-[201.33px] text-start"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
