import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Coins, LetterCircleV, SignOut, User } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function UserAvatar({ className, menuMargin }: { className?: string, menuMargin?: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={cn(
            "cursor-pointer bg-greenColorSecondary border-2 hover:border-btnColorIsVoted transition-all duration-200",
            className
          )}
        >
          <AvatarFallback className="text-xl font-medium">
            {session?.user?.name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-fit flex flex-col justify-center mt-3 p-0 ${menuMargin}`}>
        <DropdownMenuItem
          className="hidden lg:flex justify-center gap-3 xl:hidden border-b-2 border-[#444453] py-3"
          onClick={() => setOpen(false)}
        >
          <p className="flex items-center gap-2 text-xl font-medium cursor-pointer text-greenColorSecondary">
            {session?.user?.remainingVotes}{" "}
            <LetterCircleV className="min-w-8 min-h-8" weight="duotone" />
          </p>
          <div className="h-8 w-[2px] bg-[#444453]"></div>
          <p className="flex items-center gap-2 text-xl font-medium cursor-pointer text-yellowColorOthers">
            {session?.user?.points && session.user.points >= 1000
              ? `${
                  session.user.points % 1000 === 0
                    ? Math.floor(session.user.points / 1000)
                    : (session.user.points / 1000).toFixed(1)
                }k`
              : session?.user?.points}{" "}
            <Coins className="min-w-[30px] min-h-[30px]" weight="duotone" />
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={() => setOpen(false)}>
          <Link
            href={"/profil"}
            className="flex items-center gap-3 text-base text-greenColorSecondary hover:bg-greenColorSecondary px-4 hover:text-white h-10"
          >
            <User className="min-w-5 min-h-5" /> Accéder au profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={() => setOpen(false)}>
          <p
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
            className="cursor-pointer flex items-center gap-3 text-base text-red-400  w-full hover:bg-red-400 px-4 hover:text-white h-10"
          >
            <SignOut className="min-w-5 min-h-5" /> Se déconnecter
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
