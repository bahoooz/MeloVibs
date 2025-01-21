import "./globals.css";
import Navbar from "@/components/global/Navbar";
import SessionProvider from "@/components/global/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/global/Footer";
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/gtag'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`relative font-global min-h-screen antialiased bg-gradient-bg from-bgGradient-start to-bgGradient-end overflow-x-hidden`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
