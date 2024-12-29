import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Profil",
  "Gérez votre compte - Votre profil MeloVib's",
  [
    "profil",
    "melovib's",
    "best music tracks"
  ],
);

export default function ProfilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-x-hidden px-8 relative">
        {children}
    </div>
  );
}
