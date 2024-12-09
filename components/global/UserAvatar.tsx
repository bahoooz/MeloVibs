import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
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

export default function UserAvatar({ className }: { className?: string }) {
  const { data: session } = useSession();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn("cursor-pointer", className)}>
          <AvatarImage
            src={session?.user?.image || ""}
            className="object-cover"
          />
          <AvatarFallback>
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
            onClick={() => signOut()}
            className="cursor-pointer flex items-center gap-3 text-base text-red-400  w-full hover:bg-red-400 px-4 hover:text-white h-10"
          >
            <SignOut className="min-w-5 min-h-5" /> Se déconnecter
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
