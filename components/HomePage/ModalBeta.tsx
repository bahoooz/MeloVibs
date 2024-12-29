import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import Image from "next/image";
import { Info } from "@phosphor-icons/react";
import { launchConfetti } from "@/lib/confetti";
import { playSound } from "@/lib/playSound";

export default function ModalBeta() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="w-[calc(100vw-48px)] lg:min-w-[800px] xl:min-w-[1000px] bg-[#252639] border-none rounded-lg py-12 overflow-y-scroll max-h-[75%] lg:max-h-[90%] gap-0">
        <Info
          size={32}
          className="absolute top-3 lg:top-6 right-3 lg:right-6 min-w-[48px] min-h-[48px]"
        />
        <div className="mx-auto max-w-[400px] lg:max-w-full">
          <AlertDialogHeader className="text-start lg:text-center space-y-0 mb-8 lg:mb-16">
            <AlertDialogTitle className=" text-xl lg:text-2xl font-normal mb-6">
              🎉 Ouverture de la bêta 🎉
            </AlertDialogTitle>
            <p className="text-greenColorSecondary">
              Avant de visiter la plateforme prenez quelques secondes pour nous
              lire :)
            </p>
          </AlertDialogHeader>
          <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-8 lg:gap-20 xl:gap-32 mb-8 lg:mb-10 xl:mb-12">
            <Image
              priority
              src={"/HomePageMedia/modal-img.jpg"}
              alt="image modal"
              width={2048}
              height={1536}
              className="h-[100px] lg:h-[446px] lg:w-[200px] xl:w-[300px] object-cover rounded-lg"
            />
            <div className="lg:w-[375px]">
              <p className="mb-[26px]">
                Nous avons l’honneur de vous annoncer{" "}
                <span className="text-greenColorSecondary">
                  l’ouverture de la bêta ouverte
                </span>{" "}
                de <span className="underline">MeloVib’s</span> ! <br /> <br />
                Nous vous invitons à{" "}
                <span className="text-greenColorSecondary">
                  tester la plateforme pendant une semaine entre le 01/01/25
                  jusqu’au 08/01/25
                </span>
                , afin de nous faire vos retours sur l’expérience utilisateur,
                les fonctionnalités principales, et si vous avez des suggestions
                à nous apporter.
              </p>
              <p className="text-xs">
                ⚠️ <span className="underline">Note importante :</span> <br />{" "}
                <br /> Nous recherchons également un{" "}
                <span className="text-blueColorTertiary">
                  manager en Marketing Digital
                </span>{" "}
                afin de faire croître la plateforme le plus rapidement possible,
                grâce à cela nous pourrons rapidement{" "}
                <span className="text-blueColorTertiary">
                  entrer en contact avec des marques
                </span>{" "}
                et vous proposer{" "}
                <span className="text-blueColorTertiary">
                  une boutique satisfaisante
                </span>{" "}
                pour vous récompenser, nos utilisateurs. <br /> <br /> Alors si
                vous êtes quelqu’un de motivé, sérieux, et que vous êtes prêt à
                vous{" "}
                <span className="text-blueColorTertiary">
                  investir sérieusement
                </span>{" "}
                dans la croissance de la plateforme, nous vous invitons à
                devenir notre premier membre de l’équipe de{" "}
                <span className="underline">MeloVib’s</span> en nous{" "}
                <span className="text-blueColorTertiary">
                  contactant directement à ce mail
                </span>{" "}
                (qui sera remplacé à l’ouverture officielle le 08/01/25) :{" "}
                <span className="text-blueColorTertiary underline">
                  noreply@melovibs.com
                </span>
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className="w-full lg:w-fit"
              onClick={() => {
                launchConfetti();
                playSound("/Sounds/welcome-sound.wav");
              }}
            >
              Découvrir MeloVib&apos;s
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
