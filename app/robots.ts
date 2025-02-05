import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
      '/api/',
      '/connexion',
      '/inscription',
      '/profil',
      '/verification-reussie',
      '/verification-echec',
      "/newsletter/"
      ],
    },
    sitemap: "https://melovibs.com/sitemap.xml",
  };
}
