"use client";

import React, { useEffect, useState } from "react";
import MeloVibsTitle from "../global/MeloVibsTitle";
import Image from "next/image";

export default function GlobalStats() {
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    async function fetchTotalVotes() {
      try {
        const res = await fetch("/api/stats/total-votes");
        const data = await res.json();
        setTotalVotes(data.totalVotes);
        console.log("le total des votes est de :", data.totalVotes);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du total des votes:",
          error
        );
      }
    }
    fetchTotalVotes();
  }, []);

  return (
    <section className="mt-32 lg:mt-44">
      <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
        <MeloVibsTitle />, c&apos;est :
      </h2>
      <div className="flex flex-col md:flex-row md:items-center xl:justify-center gap-20 lg:gap-24 mx-auto w-fit md:w-[600px] lg:w-[700px] xl:w-[1200px]">
        <div className="flex flex-col gap-8 font-semibold text-lg lg:textx-xl">
          <p>
            Nombre des votes utilisateurs :{" "}
            <span className="text-greenColorSecondary">{totalVotes}</span>
          </p>
          <p>
            Membre(s) de l&apos;équipe :{" "}
            <span className="text-greenColorSecondary">1</span>
          </p>
          <p>
            Lancement le :{" "}
            <span className="text-greenColorSecondary">01/01/2025</span>
          </p>
          <p>
            Version actuelle :{" "}
            <span className="text-greenColorSecondary">2.0.1</span>
          </p>
        </div>
        <Image
          src="/Logos/Logo-MeloVib's-1-1024x1024.png"
          alt="MeloVib's"
          width={1024}
          height={1024}
          className="w-[250px] md:w-[200px] lg:w-[240px] xl:w-[260px] h-[250px] md:h-[200px] lg:h-[240px] xl:h-[260px] animate-bounce-perso"
        />
      </div>
    </section>
  );
}
