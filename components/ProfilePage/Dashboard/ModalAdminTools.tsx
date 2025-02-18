import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spiral, Target, Wrench } from "@phosphor-icons/react";

interface ModalDashboardSettingsProps {
  isLoadingTracks: boolean;
  isLoadingArtists: boolean;
  updateTracksSuccess: boolean;
  updateArtistsSuccess: boolean;
  handleUpdateTracks: () => Promise<void>;
  handleUpdateArtists: () => Promise<void>;
}

export default function ModalDashboardSettings({
  isLoadingTracks,
  isLoadingArtists,
  updateTracksSuccess,
  updateArtistsSuccess,
  handleUpdateTracks,
  handleUpdateArtists,
}: ModalDashboardSettingsProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blueColorTertiary w-10 h-10 rounded-lg">
          <Wrench className="min-w-6 min-h-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none bg-[#252639]">
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          ✕
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl mb-8">
            Outils Admin
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <p>
              Récupérer les{" "}
              <span className="underline">derniers morceaux des playlists</span>
            </p>
            <Button
              onClick={handleUpdateTracks}
              disabled={isLoadingTracks}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              {isLoadingTracks ? (
                <Spiral className="animate-spin min-w-7 min-h-7" />
              ) : (
                <Target className="min-w-7 min-h-7" />
              )}
            </Button>
            {updateTracksSuccess && (
              <p className="text-greenColorSecondary">Mise à jour réussie !</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p>
              Récupérer les{" "}
              <span className="underline">dernières données des artistes</span>
            </p>
            <Button
              onClick={handleUpdateArtists}
              disabled={isLoadingArtists}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              {isLoadingArtists ? (
                <Spiral className="animate-spin min-w-7 min-h-7" />
              ) : (
                <Target className="min-w-7 min-h-7" />
              )}
            </Button>
            {updateArtistsSuccess && (
              <p className="text-greenColorSecondary">Mise à jour réussie !</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p>
              Envoyer un <span className="underline">test de newsletter</span>
            </p>
            <Button
              onClick={async () => {
                try {
                  await fetch("/api/newsletter/test", {
                    method: "POST",
                  });
                  alert("Newsletter de test envoyée !");
                } catch (error) {
                  alert("Erreur lors de l'envoi de la newsletter");
                  console.error(error);
                }
              }}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              <Target className="min-w-7 min-h-7" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <p>
              Envoyer la newsletter à{" "}
              <span className="underline">tous les utilisateurs</span>
            </p>
            <Button
              onClick={async () => {
                if (
                  window.confirm(
                    "Êtes-vous sûr de vouloir envoyer la newsletter à tous les utilisateurs ?"
                  )
                ) {
                  try {
                    const response = await fetch("/api/newsletter/send-all", {
                      method: "POST",
                    });
                    const data = await response.json();
                    alert(
                      `Newsletter envoyée avec succès à ${data.successful} utilisateurs\n${data.failed} échecs`
                    );
                  } catch (error) {
                    alert("Erreur lors de l'envoi de la newsletter");
                    console.error(error);
                  }
                }
              }}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              <Target className="min-w-7 min-h-7" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <p>
              Lancer la <span className="underline">migration newsletter</span>
            </p>
            <Button
              onClick={async () => {
                if (window.confirm("Êtes-vous sûr de vouloir lancer la migration ?")) {
                  try {
                    const response = await fetch("/api/admin/run-migration", {
                      method: "POST",
                    });
                    const data = await response.json();
                    alert(
                      `Migration terminée avec succès!\n${data.result.modifiedCount} utilisateurs mis à jour`
                    );
                  } catch (error) {
                    alert("Erreur lors de la migration");
                    console.error(error);
                  }
                }
              }}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              <Target className="min-w-7 min-h-7" />
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
