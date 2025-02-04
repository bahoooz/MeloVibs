"use client";

import Image from "next/image";
import React from "react";

export default function ListOtherItems() {
  return (
    <div className="mt-40 sm:w-[600px] lg:w-[700px] xl:w-[1200px] sm:mx-auto">
      <div className="flex items-center gap-8 mb-20 xl:mb-32">
        <h2 className="text-xl text-greenColorSecondary shrink-0">autres</h2>
        <div className="bg-greenColorSecondary flex-1 h-[3px] rounded-full"></div>
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-center items-center gap-12 xl:gap-16">
        <Image
          src={"/ShopItems/other.png"}
          alt="Others Idea illustration"
          width={384}
          height={384}
          className="w-32 h-32 xl:w-64 xl:h-64"
        />
        <p className="text-center text-lg">Beaucoup d’autres récompenses arriveront prochainement !</p>
      </div>
    </div>
  );
}
