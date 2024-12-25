import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { SignOut, User } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function UserAvatar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();

  return (
    <DropdownMenu>
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
      <DropdownMenuContent className="w-fit flex flex-col justify-center mt-3 p-0">
        <DropdownMenuItem className="p-0">
          <Link
            href={"/profil"}
            className="flex items-center gap-3 text-base text-greenColorSecondary hover:bg-greenColorSecondary px-4 hover:text-white h-10"
          >
            <User className="min-w-5 min-h-5" /> Accéder au profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <p
            onClick={async () => {
              toast({
                title: "Déconnexion",
                description: "Vous avez été déconnecté avec succès",
                emojis: "👋",
              });
              // Attendre un peu avant la déconnexion
              await new Promise(resolve => setTimeout(resolve, 1500));
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
