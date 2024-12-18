"use client";

import React, { useEffect, useState } from "react";
import MeloVibsTitle from "../global/MeloVibsTitle";
import GreenEffectGlobalStats from "./GreenEffectGlobalStats";

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
        <MeloVibsTitle />, c'est :
      </h2>
      <div className="mx-auto w-fit flex flex-col gap-8 font-semibold text-lg lg:textx-xl xl:text-center">
        <p>
          Nombre de votes par les utilisateurs :{" "}
          <span className="text-greenColorSecondary">{totalVotes}</span>
        </p>
        <p>
          Membre(s) de l'équipe :{" "}
          <span className="text-greenColorSecondary">1</span>
        </p>
        <p>
          Lancement le :{" "}
          <span className="text-greenColorSecondary">01/01/2025</span>
        </p>
      </div>
    </section>
  );
}
