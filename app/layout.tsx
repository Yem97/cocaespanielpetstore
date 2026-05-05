import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paws & Heritage | Premium Maine Coons & Cocker Spaniels",
  description: "Exquisite Maine Coon cats and Cocker Spaniel puppies raised with love. Worldwide shipping, AKC/TICA registered. 200+ happy families.",
  openGraph: {
    title: "Paws & Heritage | Premium Maine Coons & Cocker Spaniels",
    description: "Exquisite Maine Coon cats and Cocker Spaniel puppies raised with love. Worldwide shipping, AKC/TICA registered.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-cream text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
