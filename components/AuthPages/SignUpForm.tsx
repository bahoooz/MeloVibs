"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { z } from 'zod'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

// Définir le schéma de validation avec Zod
const schema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
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
        })
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
    }

    return (
        <form className='mt-48 text-black' onSubmit={handleSubmit}>
            <Input type='text' placeholder="Nom d'utilisateur" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <Input type='email' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <Input type='password' placeholder='Mot de passe' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            
            <Input type='password' placeholder='Confirmer le mot de passe' value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

            <Button type='submit'>S'inscrire</Button>
        </form>
    )
}
