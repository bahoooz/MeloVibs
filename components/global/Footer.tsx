"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="bg-[#422B70] py-16 md:py-24 xl:py-32 text-center md:text-left border-t-[5px] border-greenColorSecondary">
      <div className="flex flex-col gap-16 md:gap-32 md:flex-row md:flex-wrap md:justify-center md:px-16">
        <div className="flex flex-col gap-10">
          <h3 className="uppercase text-xl text-greenColorSecondary">
            Plan du site
          </h3>
          <ul className="flex flex-col gap-5">
            <li>
              <Link href={"/"}>Accueil</Link>
            </li>
            <li>
              <Link href={"/"}>Boutique</Link>
            </li>
            <li>
              <Link href={"/"}>Qui sommes-nous ?</Link>
            </li>
            <li>
              <Link href={"/"}>Nous contacter</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="uppercase text-xl text-greenColorSecondary">
            Classements
          </h3>
          <ul className="flex flex-col gap-5">
            <li>
              <Link href={"/"}>Classement par artiste</Link>
            </li>
            <li>
              <Link href={"/"}>Classement du mois par musique</Link>
            </li>
            <li>
              <Link href={"/"}>Classement par musique les plus votées</Link>
            </li>
            <hr className="w-[305px] mx-auto" />
            <li>
              <Link href={"/"}>Classement RAP</Link>
            </li>
            <li>
              <Link href={"/"}>Classement POP</Link>
            </li>
            <li>
              <Link href={"/"}>Classement JAZZ</Link>
            </li>
            <li>
              <Link href={"/"}>Classement R&B</Link>
            </li>
            <li>
              <Link href={"/"}>Classement AFRO BEATS</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="uppercase text-xl text-greenColorSecondary">
            Utilisateur
          </h3>
          <ul className="flex flex-col gap-5">
            {session ? (
              <>
                <li>
                  <Link href={"/profil"}>Accéder au profil</Link>
                </li>
                <li className="cursor-pointer" onClick={() => signOut()}>
                  Se déconnecter
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={"/connexion"}>
                    <Button className="bg-white text-greenColorSecondary text-base">
                      Se connecter
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={"/inscription"}>
                    <Button className="bg-greenColorSecondary text-base">
                      Nous rejoindre
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="uppercase text-xl text-greenColorSecondary">Légal</h3>
          <ul className="flex flex-col gap-5">
            <li>Copyright © Melovib’s - Tout droits réservés</li>
            <li>Mentions légales</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
