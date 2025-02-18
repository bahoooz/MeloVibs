import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://melovibs.com"),
  title: "MeloVib's - Votez pour vos morceaux préférés",
  description:
    "Découvrez MeloVib's, la plateforme destinée aux fans de musique qui vous permet de voter pour vos morceaux préférés dans tous les genres. Chaque mois, explore les classements, suis les tendances et ajoute tes votes dans un univers musical interactif et dynamique.",
  applicationName: "MeloVib's",
  authors: [{ name: "MeloVib's Team" }],
  generator: "Next.js",
  keywords: [
    // Mots-clés principaux liés à la fonction du site
    "musique",
    "votes",
    "classement musical",
    "top musique",
    
    // Genres musicaux (les plus recherchés)
    "rap français",
    "pop",
    "kpop",
    "rnb",
    "rock",
    "electro",
    "jazz",
    "afrobeats",
    "musiques latines",
    "rap us",
    
    // Variations des termes de recherche
    "app musique",
    "app de musique",
    "app de vote",
    "app de classement",
    "app de vote musical",
    "app de classement musical",
    
    // Nom de marque et variations
    "melovibs",
    "melovib's",
    "melovib's.com",
    "sons"
  ],
  referrer: "origin-when-cross-origin",
  creator: "MeloVib's",
  publisher: "MeloVib's",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      {
        url: "/Logos/icon-melovibs-64x64.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        url: "/Logos/icon-melovibs-192x192",
        sizes: "192x192",
        type: "image/png"
      },
      {
        url: "/Logos/icon-melovibs-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    shortcut: "/Logos/icon-melovibs-64x64.png",
    apple: [
      {
        url: "/Logos/icon-melovibs-180x180.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://melovibs.com",
    title: "MeloVib's - Votez pour vos morceaux préférés",
    description:
      "Découvrez MeloVib's, la plateforme destinée aux fans de musique qui vous permet de voter pour vos morceaux préférés dans tous les genres. Chaque mois, explore les classements, suis les tendances et ajoute tes votes dans un univers musical interactif et dynamique.",
    siteName: "MeloVib's",
    images: [
      {
        url: "/Logos/icon-melovibs-1024x1024.png",
        width: 1024,
        height: 1024,
        alt: "Logo MeloVib's",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeloVib's - Votez pour vos morceaux préférés",
    description:
      "Découvrez MeloVib's, la plateforme destinée aux fans de musique qui vous permet de voter pour vos morceaux préférés dans tous les genres. Chaque mois, explore les classements, suis les tendances et ajoute tes votes dans un univers musical interactif et dynamique.",
    images: ["/Logos/icon-melovibs-1024x1024.png"],
    creator: "@melovibs",
    site: "@melovibs",
  },
  verification: {
    google: "zLm7Wx4qvOby9dBHNcIGGKOEKGoGV2b5zxygNAxO6rY", // À remplacer par votre code de vérification Google
  },
  category: "Music, Entertainment, Social, Lifestyle, Technology",
};

export function generateMetadata(
  title?: string,
  description?: string,
  keywords?: string[],
  image?: string
): Metadata {
  return {
    ...defaultMetadata,
    title: title ? `${title} - MeloVib's` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    keywords: keywords
      ? [...defaultMetadata.keywords!, ...keywords]
      : defaultMetadata.keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title ? `${title} | MeloVib's` : defaultMetadata.title!,
      description: description || defaultMetadata.description!,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title || "MeloVib's",
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title ? `${title} | MeloVib's` : defaultMetadata.title!,
      description: description || defaultMetadata.description!,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
  };
}
