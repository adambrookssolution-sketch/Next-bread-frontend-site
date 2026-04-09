import type { Metadata } from "next";
import { laborUnion, libreCaslon, lexend, abuget } from "./lib/fonts";
import { BRAND } from "./lib/constants";
import JsonLd from "./components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoscript } from "./components/Analytics";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${BRAND.fullName} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  metadataBase: new URL(`https://${BRAND.domain}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: BRAND.fullName,
    title: BRAND.fullName,
    description: BRAND.description,
    images: [
      {
        url: "/images/hero/97.jpg",
        width: 1200,
        height: 630,
        alt: BRAND.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.fullName,
    description: BRAND.description,
    images: ["/images/hero/97.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${laborUnion.variable} ${libreCaslon.variable} ${lexend.variable} ${abuget.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
      </head>
      <body>
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
