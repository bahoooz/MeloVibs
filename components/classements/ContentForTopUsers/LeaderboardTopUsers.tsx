import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Empty, Spiral, Sunglasses } from "@phosphor-icons/react";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  voteCount: number;
  badges: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function LeaderboardTopUsers() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const response = await fetch("/api/stats/top-users");
      const data = await response.json();
      setTopUsers(data.users);
      setIsLoading(false);
    };
    fetchTopUsers();
  }, []);

  const getMostExpensiveBadge = (badges: User["badges"]) => {
    if (!badges || badges.length === 0) return null;
    return badges.reduce((prev, current) =>
      prev.price > current.price ? prev : current
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] xl:mx-auto h-[400px] flex items-center justify-center">
        <Spiral className="animate-spin text-greenColorSecondary" size={80} />
      </div>
    );
  }

  return (
    <div className="max-w-full xl:max-w-[1200px] xl:w-fit h-[960px] flex xl:justify-center  items-center overflow-x-scroll overflow-y-hidden ml-8 md:ml-[84px] lg:ml-[160px] xl:mx-auto no-scrollbar">
      <div className="min-w-[1200px] xl:max-w-[1200px] bg-[#252639] bg-opacity-40 mx-auto relative mr-8 md:mr-[84px] lg:mr-[160px] xl:mr-0">
        <Link
          href={
            "https://www.youtube.com/watch?v=sOnqjkJTMaA&pp=ygUYbWljaGFlbCBqYWNrc29uIHRocmlsbGVy"
          }
          target="_blank"
          className="group cursor-pointer"
        >
          <Sunglasses
            className="absolute top-16 right-[160px] z-50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-32 glasses text-greenColorSecondary"
            size={100}
            weight="fill"
          />
          <Image
            src={"/ClassementsMedia/MJ_leaderboard_top_users.png"}
            width={827}
            height={1071}
            alt="Michael Jackson"
            className="absolute h-[950px] w-[500px] object-cover -right-0 top-1/2 -translate-y-1/2 rounded-xl group-hover:scale-[101%] transition-all duration-300 group-hover:-rotate-2"
          />
        </Link>
        <table className="w-[750px] table-auto rounded-xl overflow-hidden border">
          <thead>
            <tr className="bg-btnColorIsVoted">
              <th className="px-4 py-4 pl-8 text-start w-24 rounded-bl-xl">
                Place
              </th>
              <th className="px-4 py-4 text-start w-24">Badge</th>
              <th className="px-4 py-4 text-start w-32">Pseudonyme</th>
              <th className="px-4 py-4 text-start w-32">Total votes</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {topUsers.map((user, index) => {
              const bestBadge = getMostExpensiveBadge(user.badges);
              return (
                <tr key={user._id} className="">
                  <td className="px-4 pl-8 py-6 text-greenColorSecondary">
                    #{index + 1}
                  </td>
                  <td className="px-4 py-6">
                    {bestBadge ? (
                      <Image
                        src={bestBadge.imageUrl}
                        alt={bestBadge.name}
                        width={32}
                        height={32}
                        className="hover:scale-110 transition-all duration-300"
                        unoptimized
                      />
                    ) : (
                      <Empty size={32} />
                    )}
                  </td>
                  <td className="px-4 py-6">{user.name}</td>
                  <td className="px-4 py-6 text-greenColorSecondary">
                    {user.voteCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
