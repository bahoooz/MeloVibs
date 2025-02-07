import PageNotCreatedYet from "@/components/global/PageNotCreatedYet";
import Link from "next/link";
import React from "react";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Contact",
  "Contactez-nous pour toute demande ou pour nous faire part de vos suggestions.",
  [
    "contact",
    "contactez-nous",
    "formulaire de contact",
    "suggestions",
    "demandes"
  ],
);

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
            , <br /> ou à <span className="text-greenColorSecondary">l&apos;adresse email suivante</span> :{" "}
            <Link
              href="mailto:contact@melovibs.com"
              className="text-blueColorTertiary underline"
            >
              contact@melovibs.com
            </Link>
            .
          </p>
        }
      />
    </div>
  );
}
