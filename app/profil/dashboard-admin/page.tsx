"use client";

import ProfileContainer from "@/components/ProfilePage/ProfileContainer";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LetterCircleV,
  MagnifyingGlass,
  ShieldCheck,
  UserFocus,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateAllTracks } from "@/lib/updateAllTracks";
import { updateAllArtists } from "@/lib/updateAllArtists";
import { UserTypes } from "@/models/user";
import { Input } from "@/components/ui/input";
import { useShopStore } from "@/store/useShopStore";
import Image from "next/image";
import ModalDashboardSettings from "@/components/ProfilePage/Dashboard/ModalAdminTools";
import ModalAddTrackOrShopitem from "@/components/ProfilePage/Dashboard/ModalAddTrackOrShopitem";

export default function DashboardAdmin() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [updateTracksSuccess, setUpdateTracksSuccess] = useState(false);
  const [updateArtistsSuccess, setUpdateArtistsSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { items, fetchItems } = useShopStore();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.isAdmin) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    const initialize = async () => {
      if (items.length === 0) {
        await fetchItems();
      }
      // setIsLoading(false);
    };
    initialize();
  }, [items.length, fetchItems]);

  const handleUpdateTracks = async () => {
    setIsLoadingTracks(true);
    setUpdateTracksSuccess(false);
    try {
      await updateAllTracks();
      setUpdateTracksSuccess(true);
      setTimeout(() => setUpdateTracksSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des morceaux:", error);
    } finally {
      setIsLoadingTracks(false);
    }
  };

  const handleUpdateArtists = async () => {
    setIsLoadingArtists(true);
    setUpdateArtistsSuccess(false);
    try {
      await updateAllArtists();
      setUpdateArtistsSuccess(true);
      setTimeout(() => setUpdateArtistsSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des artistes:", error);
    } finally {
      setIsLoadingArtists(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user/get-all");
      const data = await response.json();
      console.log("Données reçues:", data);
      setUsers(data.users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const fetchTotalVotes = async () => {
    try {
      const response = await fetch("/api/stats/total-votes");
      const data = await response.json();
      setTotalVotes(data.totalVotes);
      console.log("Données reçues:", data);
    } catch (error) {
      console.error("Erreur lors de la récupération des votes:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTotalVotes();
  }, []);

  const filteredUsers = users.filter((user: UserTypes) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProfileContainer>
      <div className="lg:py-12 xl:py-16 lg:px-12 xl:px-24 lg:w-[462.69px] lg:h-[778px] xl:max-h-[778px] xl:w-full">
        <div className="flex xl:items-center flex-col xl:flex-row gap-12 xl:gap-0 xl:justify-between mb-16 xl:mb-12">
          <h1 className="font-medium text-2xl text-greenColorSecondary ">
            Dashboard
          </h1>
          <div className="flex gap-3 xl:gap-4 items-center text-xs xl:text-sm flex-wrap xl:flex-nowrap">
            <p className="flex gap-1 xl:gap-2 items-center">
              <UserFocus className="min-h-6 min-w-6 xl:min-h-7 xl:min-w-7 text-yellowColorOthers" />{" "}
              {users.length} utilisateurs
            </p>
            <p className="flex gap-1 xl:gap-2 items-center">
              <LetterCircleV
                className="min-h-6 min-w-6 xl:min-h-7 xl:min-w-7 text-greenColorSecondary"
              />{" "}
              {totalVotes} votes
            </p>
            <p className="flex gap-1 xl:gap-2 items-center">
              <ShieldCheck
                className="min-h-6 min-w-6 xl:min-h-7 xl:min-w-7 text-blueColorTertiary"
              />{" "}
              {users.filter((user: UserTypes) => user.isAdmin).length} admins
            </p>
            <div className="flex gap-1 xl:gap-2 items-center">
              <MagnifyingGlass className="min-h-6 min-w-6 xl:min-h-7 xl:min-w-7" />
              <Input
                className="bg-transparent border-white px-0 py-1 rounded w-28 border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white text-xs xl:text-sm"
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <ModalDashboardSettings
              isLoadingTracks={isLoadingTracks}
              isLoadingArtists={isLoadingArtists}
              updateTracksSuccess={updateTracksSuccess}
              updateArtistsSuccess={updateArtistsSuccess}
              handleUpdateTracks={handleUpdateTracks}
              handleUpdateArtists={handleUpdateArtists}
            />
            <ModalAddTrackOrShopitem />
          </div>
        </div>
        <div className="bg-[#482E71] w-[800px] h-[400px] overflow-auto rounded-lg">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-[#342055] sticky top-0">
              <tr className="text-left text-sm">
                <th className="py-4 px-4 font-normal rounded-l-lg">Pseudo</th>
                <th className="py-4 px-4 font-normal">Votes</th>
                <th className="py-4 px-4 font-normal">Points</th>
                <th className="py-4 px-4 font-normal">Inventaire</th>
                <th className="py-4 px-4 font-normal">Rôle</th>
                <th className="py-4 px-4 font-normal">Vts rest.</th>
                <th className="py-4 px-4 font-normal">Email</th>
                <th className="py-4 px-4 font-normal">Historique votes</th>
                <th className="py-4 px-4 font-normal rounded-r-lg">Abonné newsletter</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user: UserTypes) => (
                <tr key={user._id} className="text-sm">
                  <td className="py-2 px-4 text-white max-w-36">{user.name}</td>
                  <td className="py-2 px-4 text-white">
                    {user.votedTracks?.length || 0}
                  </td>
                  <td className="py-2 px-4 text-white">{user.points}</td>
                  <td className="py-2 px-4 text-white">
                    <div className="flex flex-wrap gap-1">
                      {user.inventory
                        .map((inventoryItem) => {
                          const shopItem = items.find(
                            (item) =>
                              item._id?.toString() ===
                                inventoryItem.itemId.toString() &&
                              item.type === "badge"
                          );
                          return shopItem;
                        })
                        .filter(Boolean)
                        .map((item) => (
                          <Image
                            key={item?._id as string}
                            src={item?.imageUrl as string}
                            alt={item?.name as string}
                            width={28}
                            height={28}
                            className="w-7 h-7 object-cover"
                            unoptimized
                          />
                        ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 text-white">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="py-2 px-4 text-white">
                    {user.remainingVotes}
                  </td>
                  <td className="py-2 px-4 text-white max-w-[100px] truncate">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 text-white">
                    <Button className="bg-transparent">
                      voir l&apos;historique
                    </Button>
                  </td>
                  <td className="py-2 px-4 text-white">
                    {user.isSubscribedToNewsletter ? "Oui" : "Non"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProfileContainer>
  );
}
