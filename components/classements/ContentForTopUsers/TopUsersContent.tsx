"use client"

import { Crown } from "lucide-react";
import React from "react";
import LeaderboardTopUsers from "./LeaderboardTopUsers";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";

export default function TopUsersContent() {
  return (
    <div>
      <h1 className="flex items-end justify-center gap-6 text-5xl mb-20 lg:mb-40 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center px-8 lg:px-0">
        <Crown className="text-[#FFF15B] hidden lg:block" size={56} />{" "}
        <span className="mb-[2px]">MeloVib&apos;s Legends Hall</span>{" "}
        <Crown className="text-[#FFF15B] hidden lg:block" size={56} />
      </h1>
      <LeaderboardTopUsers />
      <StatsAboutYou className="px-8" />
    </div>
  );
}
