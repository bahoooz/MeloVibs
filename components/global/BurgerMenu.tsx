import {
  MusicNotesPlus,
  MicrophoneStage,
  MusicNote,
  Ranking,
  X,
  Gift,
  HouseSimple,
  Question,
  PaperPlaneRight,
  CaretRight,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { NavigationMenu } from "../ui/navigation-menu";
import Link from "next/link";

export default function BurgerMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isOpenLinks, setIsOpenLinks] = useState(false);

  return (
    <div
      className={`absolute -top-12 ${
        isOpen ? "left-0" : "left-full"
      } w-full h-dvh bg-greenColorSecondary transition-all duration-300 pt-12 lg:hidden px-8`}
    >
      <div className="flex items-center justify-end h-16 mb-32">
        <X
          weight="light"
          size={32}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
        />
      </div>
      <NavigationMenu className="flex flex-col gap-6 text-lg items-start mx-auto min-w-[380px] w-[500px] max-w-[90vw] absolute px-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-[50%] sm:top-1/2">
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
        <div className="flex flex-col">
          <li
            onClick={() => setIsOpenLinks(!isOpenLinks)}
            className="flex items-center gap-3 group hover:underline cursor-pointer"
          >
            <Ranking size={24} weight="light" className="group-hover:hidden" />
            <Ranking
              size={24}
              weight="fill"
              className="hidden group-hover:block"
            />
            Classements{" "}
            <CaretRight
              className={
                isOpenLinks ? "rotate-90 transition-all duration-300" : ""
              }
              size={20}
            />
          </li>
          <ul
            className={`ml-9 flex flex-col gap-3 ${
              isOpenLinks ? "opacity-100 h-fit mt-4" : "opacity-0 max-h-0 w-0"
            }  duration-300`}
          >
            <li>
              <Link
                href={"/"}
                className="flex items-center gap-3 group hover:underline"
              >
                <MicrophoneStage
                  className="min-h-6 min-w-6 group-hover:hidden"
                  weight="light"
                />
                <MicrophoneStage
                  className="min-h-6 min-w-6 hidden group-hover:block"
                  weight="fill"
                />
                Classement par artistes
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center gap-3 group hover:underline"
              >
                <MusicNote
                  className="min-h-6 min-w-6 group-hover:hidden"
                  weight="light"
                />
                <MusicNote
                  className="min-h-6 min-w-6 hidden group-hover:block"
                  weight="fill"
                />
                Classement du mois par musiques
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center gap-3 group hover:underline"
              >
                <MusicNotesPlus
                  className="min-h-6 min-w-6 group-hover:hidden"
                  weight="light"
                />
                <MusicNotesPlus
                  className="min-h-6 min-w-6 hidden group-hover:block"
                  weight="fill"
                />
                Classement par musiques les plus votées
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href={"/"}
          className="flex items-center gap-3 group hover:underline"
        >
          <Gift size={24} weight="light" className="group-hover:hidden" />
          <Gift size={24} weight="fill" className="hidden group-hover:block" />
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
      </NavigationMenu>
    </div>
  );
}
