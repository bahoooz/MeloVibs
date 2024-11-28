"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';


const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
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
      })
      if (res?.ok) {
        router.push("/")
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
  }
  return (

    <form className='mt-48 text-black' onSubmit={handleSubmit}>

      <Input type='email' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

      <Input type='password' placeholder='Mot de passe' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />


      <Button type='submit'>Se connecter</Button>
    </form>

  )
}
