import PageNotCreatedYet from "@/components/global/PageNotCreatedYet";
import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <div>
      <PageNotCreatedYet
        note={
          <p>
            Cette page vous permettra de nous contacter pour{" "}
            <span className="text-greenColorSecondary">toute demande</span> via
            notre formulaire de contact. <br /> <br /> En attendant, vous pouvez{" "}
            <span className="text-greenColorSecondary">nous contacter via</span>{" "}
            notre{" "}
            <Link
              href="https://discord.gg/StTxKe7DwY"
              className="text-blueColorTertiary underline"
            >
              Discord
            </Link>
            , <br /> ou à <span className="text-greenColorSecondary">l'adresse email suivante</span> :{" "}
            <Link
              href="mailto:contact@sdm-project.com"
              className="text-blueColorTertiary underline"
            >
              noreply@melovibs.com
            </Link>
            .
          </p>
        }
      />
    </div>
  );
}
