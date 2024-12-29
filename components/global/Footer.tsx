"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="bg-[#422B70] py-16 md:py-24 xl:py-32 text-center md:text-left border-t-[5px] border-greenColorSecondary mt-60">
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
              <Link href={"/boutique"}>Boutique</Link>
            </li>
            <li>
              <Link href={"/histoire"}>Qui sommes-nous ?</Link>
            </li>
            <li>
              <Link href={"/contact"}>Nous contacter</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="uppercase text-xl text-greenColorSecondary">
            Classements
          </h3>
          <ul className="flex flex-col gap-5">
            <li>
              <Link href={"/classements/artistes"}>
                Classement des artistes
              </Link>
            </li>
            <li>
              <Link href={"/classements/morceaux"}>
                Classement des musiques
              </Link>
            </li>
            <hr className="w-[305px] mx-auto" />
            <li>
              <Link href={"/classements/morceaux/rap-fr"}>
                Classement RAP FR
              </Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/pop"}>Classement POP</Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/jazz"}>Classement JAZZ</Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/r&b"}>Classement R&B</Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/rap-us"}>
                Classement RAP US
              </Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/afro-beats"}>
                Classement AFRO BEATS
              </Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/latines"}>
                Classement LATINES
              </Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/rock"}>Classement ROCK</Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/electro"}>
                Classement ELECTRO
              </Link>
            </li>
            <li>
              <Link href={"/classements/morceaux/kpop"}>Classement K-POP</Link>
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
            <li>Mentions légales</li>
            <li>Politique de confidentialité</li>
            <li>Conditions générales d&apos;utilisation</li>
            <li>Politique des cookies</li>
            <li>Copyright © Melovib’s - Tout droits réservés</li>
            <li className="text-sm text-gray-400">
              (cette partie est en cours de développement)
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
