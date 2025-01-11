"use client";

import {
  ArrowsClockwise,
  FadersHorizontal,
  MusicNotes,
  UserGear,
} from "@phosphor-icons/react";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Sidebar() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="lg:bg-white lg:px-6 lg:py-12 lg:relative rounded-3xl">
      <div className="flex justify-between mb-8 items-center">
        <h2 className="text-greenColorSecondary text-xl lg:text-2xl font-medium">
          Profil
        </h2>
        <Button 
          className="hidden lg:flex bg-blueColorTertiary rounded-lg w-12 h-12" 
          onClick={async () => {
            try {
              setIsLoading(true);
              await update();
              console.log("session rafraichie");
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <ArrowsClockwise className={`min-w-6 min-h-6 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
        <h2 className="text-xl lg:text-2xl font-medium text-blueColorTertiary title lg:absolute bottom-12">
          MeloVib<span className="text-greenColorSecondary">&apos;s</span>
        </h2>
      </div>
      <nav className="mb-12">
        <ul
          className={`flex lg:flex-col justify-center sm:justify-between lg:gap-4 ${
            session?.user?.isAdmin ? "gap-5 sm:gap-16" : "gap-12"
          }`}
        >
          <li
            className={`h-12 w-full bg-greenColorSecondary rounded-lg lg:rounded-xl lg:w-full overflow-hidden ${
              session?.user?.isAdmin ? "sm:w-full" : "sm:w-[100px]"
            }`}
          >
            <Link
              href="/profil"
              className="w-full h-full flex justify-center items-center lg:gap-3 lg:px-8"
            >
              <UserGear className="min-w-8 min-h-8" />
              <span className="hidden lg:block">Compte</span>
            </Link>
          </li>
          <li
            className={`h-12 w-full bg-greenColorSecondary rounded-lg lg:rounded-xl lg:w-full overflow-hidden  ${
              session?.user?.isAdmin ? "sm:w-full" : "sm:w-[100px]"
            }`}
          >
            <Link
              href="/profil/votes"
              className="w-full h-full flex justify-center items-center lg:gap-3 lg:px-8"
            >
              <MusicNotes className="min-w-8 min-h-8" />
              <span className="hidden lg:block">Votes</span>
            </Link>
          </li>
          <li
            className={`h-12 w-full flex justify-center items-center bg-blueColorTertiary rounded-lg lg:rounded-xl lg:hidden overflow-hidden cursor-pointer  ${
              session?.user?.isAdmin ? "sm:w-full" : "sm:w-[100px]"
            }`}
            onClick={async () => {
              try {
                setIsLoading(true);
                await update();
                console.log("session rafraichie");
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <ArrowsClockwise className={`min-w-8 min-h-8 ${isLoading ? "animate-spin" : ""}`} />
          </li>
          {session?.user?.isAdmin && (
            <li className="h-12 w-full bg-blueColorTertiary rounded-lg lg:rounded-xl lg:w-full overflow-hidden ">
              <Link
                href="/profil/dashboard-admin"
                className="w-full h-full flex justify-center items-center lg:gap-3 lg:px-8"
              >
                <FadersHorizontal className="min-w-8 min-h-8" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
