import React from "react";
import { Input } from "../ui/input";
import { useSession, } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function UpdateForm() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: session?.user?.email || "",
    password: "",
    confirmPassword: "",
  });

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        if (formData.password && formData.password !== formData.confirmPassword) {
            throw new Error("Les mots de passe ne correspondent pas");
        }

        if (formData.password && formData.password.length < 6) {
            throw new Error("Le mot de passe doit contenir au moins 6 caractères");
        }

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

        setFormData({
            ...formData,
            password: "",
            confirmPassword: "",
        });
        
        alert("Données mises à jour avec succès");

    } catch (error) {
        console.error(error);
        alert(error instanceof Error ? error.message : "Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 xl:w-full xl:mt-8">
      <div className="flex flex-col gap-2">
        <label className="text-greenColorSecondary" htmlFor="name">
          Email
        </label>
        <Input
          type="text"
          placeholder="Adresse email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="text-black"
        />
        <span className="text-[#64748B] text-sm">
          Modifiez votre adresse email
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-greenColorSecondary" htmlFor="name">
          Mot de passe
        </label>
        <Input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="text-black"
        />
        <span className="text-[#64748B] text-sm">
          Modifiez votre mot de passe
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-greenColorSecondary" htmlFor="name">
          Email
        </label>
        <Input
          type="password"
          placeholder="Confirmation du mot de passe"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          className="text-black"
        />
        <span className="text-[#64748B] text-sm">
          Confirmez votre mot de passe
        </span>
      </div>
      <Button className="rounded-md mt-4 xl:absolute right-12 bottom-8 xl:px-8" type="submit">Mettre à jour</Button>
    </form>
  );
}
