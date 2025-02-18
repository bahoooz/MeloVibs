"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { CircleNotch } from "@phosphor-icons/react";

const schema = z.object({
  email: z.string().email("Email invalide").optional(),
  object: z.string()
    .min(3, "L'objet doit contenir au moins 3 caractères")
    .max(100, "L'objet ne doit pas dépasser 100 caractères"),
  message: z.string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne doit pas dépasser 1000 caractères")
}).refine((data) => {
  if (!data.email) {
    return false;
  }
  return true;
}, {
  message: "L'email est requis",
  path: ["email"]
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: session?.user?.email || "",
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email || data.email,
          object: data.object,
          message: data.message,
          userName: session?.user?.name
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      toast({
        title: "Message envoyé",
        description: "Une réponse vous sera envoyée dans les plus brefs délais",
        emojis: "✉️",
      });

      reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message : " + error,
        emojis: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-48 text-black bg-[#0F172A] rounded-2xl overflow-hidden sm:w-[500px] md:w-[600px] lg:w-fit sm:mx-auto lg:flex lg:items-stretch lg:px-12 xl:px-20 lg:py-12 xl:py-20 lg:gap-12 xl:gap-20 h-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative xl:w-[400px]">
        <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-10"></div>
        <Image
          priority
          src="/FormsMedia/billie_eilish_contact.webp"
          alt="image billie eilish contact"
          width={1284}
          height={1600}
          className="w-full lg:w-auto lg:max-w-[300px] xl:max-w-[400px] h-52 lg:h-full object-cover rounded-2xl"
        />
      </div>
      <div className="lg:py-12">
        <h1 className="text-greenColorSecondary text-center lg:text-start my-9 lg:my-0 lg:mb-12 text-2xl lg:text-5xl font-medium">
          Nous contacter
        </h1>
        <div className="px-6 md:px-16 lg:px-0">
          <div className="flex flex-col gap-5">
            {
              !session ? (
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
                  Entrez votre adresse email
                </span>
              )}
                </div>
              ) : ""
            }

            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="object">
                Objet
              </label>
              <Input type="text" placeholder="Objet" {...register("object")} />
              {errors.object ? (
                <span className="text-red-400 text-sm">
                  {errors.object.message}
                </span>
              ) : (
                <span className="text-[#64748B] text-sm">
                  Entrez l&apos;objet de votre message
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-greenColorSecondary" htmlFor="message">
                Contenu du message
              </label>
              <Textarea className="min-h-32 max-h-56" placeholder="Contenu du message" {...register("message")} />
              {errors.message ? (
                <span className="text-red-400 text-sm">
                  {errors.message.message}
                </span>
              ) : (
                <span className="text-[#64748B] text-sm">
                  Entrez le contenu du message
                </span>
              )}
            </div>
          </div>
              <Button
                type="submit"
                className="text-white w-full rounded-md px-8 mt-8 mb-9"
                disabled={isLoading}
              >
                {isLoading ? <CircleNotch className="animate-spin" size={20} /> : "Envoyer"}
              </Button>
        </div>
      </div>
    </form>
  );
}
