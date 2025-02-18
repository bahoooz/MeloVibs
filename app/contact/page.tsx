import React from "react";
import { generateMetadata } from "@/lib/metadata";
import ContactForm from "@/components/Contact/ContactForm";

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
    <div className="px-8 mb-40">
      <ContactForm />
    </div>
  );
}
