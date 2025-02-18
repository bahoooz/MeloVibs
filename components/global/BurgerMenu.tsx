import {
  MicrophoneStage,
  MusicNote,
  Ranking,
  X,
  Gift,
  HouseSimple,
  Question,
  PaperPlaneRight,
  CaretRight,
  UsersThree,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { NavigationMenu } from "../ui/navigation-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export default function BurgerMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { data: session } = useSession();
  const [isOpenLinks, setIsOpenLinks] = useState(false);
  const { toast } = useToast();

  return (
    <div
      className={`absolute -top-12 ${
        isOpen ? "left-0" : "left-full"
      } w-full h-dvh bg-[#27263C] transition-all duration-300 pt-12 lg:hidden px-8 flex flex-col justify-center items-center`}
    >
      <X
        weight="light"
        size={32}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer absolute top-16 right-8"
      />
      <div className="flex flex-col gap-12">
        <NavigationMenu className="flex flex-col gap-6 text-lg items-start justify-center mx-auto">
          <Link
            href={"/"}
            onClick={() => setIsOpen(false)}
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
              <Ranking
                size={24}
                weight="light"
                className="group-hover:hidden"
              />
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
                isOpenLinks
                  ? "opacity-100 h-fit mt-4"
                  : "opacity-0 max-h-0 w-0 pointer-events-none"
              }  duration-300`}
            >
              <li>
                <Link
                  href={"/classements/morceaux"}
                  onClick={() => setIsOpen(false)}
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
                  Classement des morceaux
                </Link>
              </li>
              <li>
                <Link
                  href={"/classements/artistes"}
                  onClick={() => setIsOpen(false)}
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
                  Classement des artistes
                </Link>
              </li>
              <li>
                <Link
                  href={"/classements/utilisateurs"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 group hover:underline"
                >
                  <UsersThree
                    className="min-h-6 min-w-6 group-hover:hidden"
                    weight="light"
                  />
                  <UsersThree
                    className="min-h-6 min-w-6 hidden group-hover:block"
                    weight="fill"
                  />
                  Classement des utilisateurs
                </Link>
              </li>
            </ul>
          </div>
          <Link
            href={"/boutique"}
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
        </NavigationMenu>
        <div className="flex flex-col gap-4">
          {session ? (
            <>
              <Button>
                <Link
                  className=""
                  href={"/profil"}
                  onClick={() => setIsOpen(false)}
                >
                  Accéder au profil
                </Link>
              </Button>
              <Button
                className="bg-transparent border-2 border-red-400"
                onClick={async () => {
                  toast({
                    title: "Déconnexion",
                    description: "Vous avez été déconnecté avec succès",
                    emojis: "👋",
                  });
                  // Attendre un peu avant la déconnexion
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                  await signOut();
                }}
              >
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Button>
                <Link
                  className=""
                  href={"/inscription"}
                  onClick={() => setIsOpen(false)}
                >
                  S&apos;inscrire
                </Link>
              </Button>
              <Button className="bg-transparent border-2 border-btnColorIsVoted">
                <Link
                  className=""
                  href={"/connexion"}
                  onClick={() => setIsOpen(false)}
                >
                  Se connecter
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
