"use client";

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../ui/navigation-menu";
import {
  Gift,
  HouseSimple,
  LetterCircleV,
  Lightbulb,
  List,
  MicrophoneStage,
  MusicNote,
  PaperPlaneRight,
  Question,
  Ranking,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import BurgerMenu from "./BurgerMenu";
import UserAvatar from "./UserAvatar";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu className="mt-12 max-w-full lg:bg-[#252639]/80 lg:rounded-full h-16 lg:w-[95%] xl:w-[1200px] lg:mx-auto fixed top-0 left-0 right-0 px-8 lg:px-0 z-50">
      <ul className="flex justify-between w-full items-center lg:hidden">
        <li className={session ? "" : "hidden"}>
          <div className="flex items-center gap-4 relative">
            <UserAvatar className="w-12 h-12" />
            <div className="relative group">
              <p
                className={`flex items-center gap-[6px] text-2xl font-medium cursor-pointer ${
                  (session?.user?.remainingVotes as number) > 7
                    ? "text-green-600"
                    : (session?.user?.remainingVotes as number) > 3
                    ? "text-greenColorSecondary"
                    : (session?.user?.remainingVotes as number) > 2
                    ? "text-yellow-400"
                    : "text-red-500"
                }`}
              >
                {session?.user?.remainingVotes}{" "}
                <LetterCircleV className="min-w-8 min-h-8" weight="duotone" />
              </p>
              <div className="opacity-0 group-hover:opacity-100 group-hover:-bottom-4 transition-all duration-300 absolute -bottom-0 translate-y-full left-1/2 -translate-x-1/2 bg-[#252639] text-xs w-44 p-2 rounded-lg pointer-events-none -z-10 infobulle">
                <p>
                  Votre nombre de votes disponibles. Vous gagnez 2 votes toutes
                  les 3 heures.
                </p>
                <div className="absolute top-1 right-1 bg-[#252639] rounded-full p-2 translate-x-1/2 -translate-y-1/2">
                  <Lightbulb
                    size={20}
                    weight="duotone"
                    className=" text-yellow-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
        <Image
          src="/Logos/Logo-MeloVib's-256x256.png"
          alt="logo"
          width={256}
          height={256}
          className={session ? "hidden" : "w-11 h-11"}
        />
        <li>
          <List
            weight="light"
            size={32}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          />
        </li>
      </ul>
      <div className="hidden lg:flex w-full justify-between items-center px-3">
        <ul className="flex items-center justify-center gap-10 xl:gap-12 ml-8">
          <li>
            <Link
              href={"/"}
              className="flex items-center gap-3 group hover:underline"
            >
              <HouseSimple
                size={24}
                weight="light"
                className="group-hover:hidden"
              />
              <HouseSimple
                size={24}
                weight="fill"
                className="hidden group-hover:block"
              />
              Accueil
            </Link>
          </li>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 group hover:underline">
              <Ranking
                size={24}
                weight="light"
                className="mr-2 group-hover:hidden"
              />{" "}
              <Ranking
                size={24}
                weight="fill"
                className="mr-2 hidden group-hover:block"
              />{" "}
              Classements
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#252639] w-full">
              <div className="py-6 flex justify-center items-center">
                <ul className="flex flex-col gap-6">
                  <li>
                    <Link
                      href={"/classements/artistes"}
                      className="flex gap-4 group hover:underline"
                    >
                      <MicrophoneStage
                        size={24}
                        weight="light"
                        className="group-hover:hidden"
                      />
                      <MicrophoneStage
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                      />{" "}
                      Classement des artistes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/classements/morceaux"}
                      className="flex gap-4 group hover:underline"
                    >
                      <MusicNote
                        size={24}
                        weight="light"
                        className="group-hover:hidden"
                      />
                      <MusicNote
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                      />{" "}
                      Classement des musiques
                    </Link>
                  </li>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <Link
            href={"/boutique"}
            className="flex items-center gap-3 group hover:underline"
          >
            <Gift size={24} weight="light" className="group-hover:hidden" />
            <Gift
              size={24}
              weight="fill"
              className="hidden group-hover:block"
            />
            Boutique
          </Link>
          <Link
            href={"/histoire"}
            className="flex items-center gap-3 group hover:underline"
          >
            <Question size={24} weight="light" className="group-hover:hidden" />
            <Question
              size={24}
              weight="fill"
              className="hidden group-hover:block"
            />
            Qui sommes-nous ?
          </Link>
          <Link
            href={"/contact"}
            className="flex items-center gap-3 group hover:underline"
          >
            <PaperPlaneRight
              size={24}
              weight="light"
              className="group-hover:hidden"
            />
            <PaperPlaneRight
              size={24}
              weight="fill"
              className="hidden group-hover:block"
            />
            Contact
          </Link>
        </ul>
        {session ? (
          <div className="flex items-center gap-[1.5vw] xl:gap-6">
            <div className="relative group">
              <p
                className={`flex items-center gap-1 xl:gap-2 font-medium xl:text-xl cursor-pointer ${
                  (session?.user?.remainingVotes as number) > 7
                    ? "text-green-600"
                    : (session?.user?.remainingVotes as number) > 3
                    ? "text-greenColorSecondary"
                    : (session?.user?.remainingVotes as number) > 2
                    ? "text-yellow-400"
                    : "text-red-500"
                }`}
              >
                {session?.user?.remainingVotes}{" "}
                <LetterCircleV
                  className="min-w-7 xl:min-w-8 min-h-7 xl:min-h-8"
                  weight="duotone"
                />
              </p>
              <div className="opacity-0 group-hover:opacity-100 group-hover:-bottom-10 xl:group-hover:-bottom-8 transition-all duration-300 absolute -bottom-0 translate-y-full left-1/2 -translate-x-1/2 bg-[#252639] text-sm w-52 p-2 rounded-lg pointer-events-none -z-10 infobulle">
                <p>
                  Votre nombre de votes disponibles. Vous gagnez 2 votes toutes
                  les 3 heures.
                </p>
                <div className="absolute top-1 right-1 bg-[#252639] rounded-full p-2 translate-x-1/2 -translate-y-1/2">
                  <Lightbulb
                    size={20}
                    weight="duotone"
                    className=" text-yellow-300"
                  />
                </div>
              </div>
            </div>
            <UserAvatar className="hover:scale-105 transition-all duration-200" />
          </div>
        ) : (
          <Link href={"/connexion"}>
            <Button className="xl:hidden">
              <User className="min-w-6 min-h-6" size={20} weight="regular" />
            </Button>
            <Button className="hidden xl:block">Nous rejoindre</Button>
          </Link>
        )}
      </div>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </NavigationMenu>
  );
}
