"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../ui/navigation-menu";
import {
  Gift,
  HouseSimple,
  List,
  MicrophoneStage,
  MusicNote,
  MusicNotesPlus,
  PaperPlaneRight,
  Question,
  Ranking,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <NavigationMenu className="mt-12 lg:bg-[#202020] lg:bg-opacity-50 lg:rounded-full h-16 lg:w-[95%] xl:w-[1200px] lg:mx-auto fixed top-0 left-0 right-0 px-8 lg:px-0">
      <ul className="flex justify-between w-full items-center lg:hidden">
        <li className="font-bold text-2xl">WazyUp</li>
        <li>
          <List weight="light" size={32} />
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
                    <Link href={"/"} className="flex gap-4 group hover:underline">
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
                      Classement par artistes
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-4 group hover:underline">
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
                      Classement du mois par musiques
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-4 group hover:underline">
                      <MusicNotesPlus
                        size={24}
                        weight="light"
                        className="group-hover:hidden"
                      />
                      <MusicNotesPlus
                        size={24}
                        weight="fill"
                        className="hidden group-hover:block"
                      />{" "}
                      Classement par musiques les plus votées
                    </Link>
                  </li>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <Link
            href={"/"}
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
            href={"/"}
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
            href={"/"}
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
            Nous contacter
          </Link>
        </ul>
        <Link href={"/inscription"}>
          <Button className="xl:hidden">
            <User className="min-w-6 min-h-6" size={20} weight="regular" />
          </Button>
          {session ? (<Avatar>
            <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
            <AvatarFallback>{session.user?.name ?? ""}</AvatarFallback>
          </Avatar>
          ) : (
              <Button className="hidden xl:block">Nous rejoindre</Button>
          )}
        </Link>
      </div>
    </NavigationMenu>
  );
}
