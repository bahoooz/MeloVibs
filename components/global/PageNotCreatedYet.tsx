"use client";

import { Wrench } from "@phosphor-icons/react";
import React from "react";

export default function PageNotCreatedYet({ note }: { note: JSX.Element }) {
  return (
    <div className="min-h-screen px-8 mt-48 lg:mt-52 xl:mt-56 sm:mx-auto sm:max-w-[550px]">
      <div className="flex flex-col gap-5 sm:gap-8 mb-5">
        <h1 className="text-2xl font-medium">
          Cette page est en cours de développement{" "}
        </h1>
        <Wrench size={48} className="animate-spin text-greenColorSecondary sm:mx-auto" />
      </div>
      <div>
        <h2 className="text-xl mb-5 sm:mb-8">📘 Note importante :</h2>
        <div className="flex flex-col gap-5 sm:gap-8">
          <hr className="border border-greenColorSecondary" />
          {note}
          <hr className="border border-greenColorSecondary" />
        </div>
      </div>
    </div>
  );
}
