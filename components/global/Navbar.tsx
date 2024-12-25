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

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu className="mt-12 max-w-full lg:bg-[#252639]/80 lg:rounded-full h-16 lg:w-[95%] xl:w-[1200px] lg:mx-auto fixed top-0 left-0 right-0 px-8 lg:px-0 z-50">
      <ul className="flex justify-between w-full items-center lg:hidden">
        <li className="">
          <UserAvatar className="w-12 h-12" />
        </li>
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
            Contact
          </Link>
        </ul>
        {session ? (
          <UserAvatar className="hover:scale-[1.45] transition-all duration-200" />
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
