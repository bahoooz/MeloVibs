import "./globals.css";
import Navbar from "@/components/global/Navbar";
import SessionProvider from "@/components/global/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/global/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`relative font-global min-h-screen antialiased bg-gradient-bg from-bgGradient-start to-bgGradient-end overflow-x-hidden`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
