import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import React from "react";

export default function ModalAddTrackOrShopitem() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blueColorTertiary w-10 h-10 rounded-lg">
          <Plus className="min-w-6 min-h-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          ✕
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl mb-8">
            Outils Admin
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
            
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
