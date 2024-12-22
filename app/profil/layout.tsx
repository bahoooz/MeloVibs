import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeloVib's - Votez pour vos morceaux préférés",
  description: "MeloVib's - Votez pour vos morceaux préférés",
};

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
