import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rumiscatering.ca"),
  title: {
    default: "Rumi's Boutique Catering | High Tea & Cocktail Parties in Toronto",
    template: "%s | Rumi's Boutique Catering"
  },
  description:
    "Elegant Toronto catering specializing in High Tea, Cocktail Parties, vintage china service, and Certified Tea Sommelier pairings.",
  openGraph: {
    title: "Rumi's Boutique Catering",
    description:
      "Boutique Toronto catering for High Tea and Cocktail Parties with Certified Tea Sommelier pairings.",
    url: "https://rumiscatering.ca",
    siteName: "Rumi's Boutique Catering",
    images: [
      {
        url: "/images/high-tea-hero.png",
        width: 1200,
        height: 630,
        alt: "Elegant high tea table with vintage china and pastries"
      }
    ],
    locale: "en_CA",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: site.name,
  telephone: site.phone,
  email: site.email,
  areaServed: {
    "@type": "City",
    name: site.areaServed
  },
  url: "https://rumiscatering.ca",
  sameAs: [site.instagram, site.facebook],
  servesCuisine: ["High Tea", "Cocktail Party Catering"],
  priceRange: "$$$"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <Script
          id="rumis-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
