import { BRAND, LOCATIONS } from "@/app/lib/constants";

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.legalName,
    url: `https://${BRAND.domain}`,
    logo: `https://${BRAND.domain}/logo/LogotipoPrincipal_Rojo.svg`,
    description: BRAND.description,
    telephone: `+51${BRAND.whatsapp}`,
    email: BRAND.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+51${BRAND.whatsapp}`,
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [BRAND.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocalBusinessSchemas() {
  const schemas = LOCATIONS.map((location) => ({
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.split(",")[0],
      addressLocality: "Chincha Alta",
      addressRegion: "Ica",
      postalCode: "11701",
      addressCountry: "PE",
    },
    telephone: `+51${location.phone}`,
    url: `https://${BRAND.domain}`,
    hasMap: location.mapsUrl,
    priceRange: "$",
    servesCuisine: "Bakery",
    image: `https://${BRAND.domain}/images/hero/97.jpg`,
    openingHours: location.hours.map((h) => h).join(", "),
  }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function JsonLd() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchemas />
    </>
  );
}
