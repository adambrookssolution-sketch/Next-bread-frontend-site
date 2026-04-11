import { createClient, type Entry, type Asset } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: "preview.contentful.com",
});

function getClient(preview = false) {
  return preview ? previewClient : client;
}

// Helper: extract image URL from Contentful asset
function assetUrl(asset: Asset | undefined): string {
  const url = asset?.fields?.file?.url;
  return url ? `https:${url}` : "";
}

// ============ PRODUCTS ============

export interface CmsProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  bestSeller: boolean;
}

export async function getProducts(): Promise<CmsProduct[]> {
  const res = await getClient().getEntries({
    content_type: "product",
    "fields.visible": true,
    order: ["fields.order"],
    limit: 100,
    include: 1,
  });

  return res.items.map((item: Entry) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    category: item.fields.category as string,
    image: assetUrl(item.fields.image as Asset),
    description: item.fields.description as string,
    bestSeller: (item.fields.bestSeller as boolean) || false,
  }));
}

// ============ LOCATIONS ============

export interface CmsLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string[];
  mapsUrl: string;
  mapsShareUrl: string;
  embedQuery: string;
  coords?: { lat: number; lng: number };
}

export async function getLocations(): Promise<CmsLocation[]> {
  const res = await getClient().getEntries({
    content_type: "location",
    "fields.visible": true,
    order: ["fields.order"],
    limit: 20,
  });

  return res.items.map((item: Entry) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    address: item.fields.address as string,
    phone: item.fields.phone as string,
    hours: item.fields.hours as string[],
    mapsUrl: item.fields.mapsUrl as string,
    mapsShareUrl: (item.fields.mapsShareUrl as string) || "",
    embedQuery: (item.fields.embedQuery as string) || "",
    coords:
      item.fields.latitude && item.fields.longitude
        ? {
            lat: item.fields.latitude as number,
            lng: item.fields.longitude as number,
          }
        : undefined,
  }));
}

// ============ CLIENTS ============

export interface CmsClient {
  id: string;
  name: string;
  logo: string;
}

export async function getClients(): Promise<CmsClient[]> {
  const res = await getClient().getEntries({
    content_type: "client",
    "fields.visible": true,
    order: ["fields.order"],
    limit: 50,
    include: 1,
  });

  return res.items.map((item: Entry) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    logo: assetUrl(item.fields.logo as Asset),
  }));
}

// ============ BRAND CONFIG ============

export interface CmsBrand {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  email: string;
  whatsapp: string;
  whatsappLink: string;
  facebook: string;
  instagram: string;
}

export async function getBrand(): Promise<CmsBrand> {
  const res = await getClient().getEntries({
    content_type: "brandConfig",
    limit: 1,
  });

  const item = res.items[0];
  const whatsapp = item.fields.whatsapp as string;
  return {
    name: item.fields.name as string,
    fullName: item.fields.fullName as string,
    tagline: item.fields.tagline as string,
    description: item.fields.description as string,
    email: item.fields.email as string,
    whatsapp,
    whatsappLink: `https://wa.me/51${whatsapp}`,
    facebook: (item.fields.facebook as string) || "",
    instagram: (item.fields.instagram as string) || "",
  };
}

// ============ ABOUT SECTION ============

export interface CmsAbout {
  mision: string;
  vision: string;
}

export async function getAbout(): Promise<CmsAbout> {
  const res = await getClient().getEntries({
    content_type: "aboutSection",
    limit: 1,
  });

  const item = res.items[0];
  return {
    mision: item.fields.mision as string,
    vision: item.fields.vision as string,
  };
}

// ============ HERO SECTION ============

export interface CmsHero {
  tagline: string;
  subtitle: string;
  ctaText: string;
  ctaWhatsappText: string;
}

export async function getHero(): Promise<CmsHero> {
  const res = await getClient().getEntries({
    content_type: "heroSection",
    limit: 1,
  });

  const item = res.items[0];
  return {
    tagline: (item.fields.tagline as string) || "Tradición artesanal en cada bocado",
    subtitle: (item.fields.subtitle as string) || "panaderia y pastelería",
    ctaText: (item.fields.ctaText as string) || "Ver Productos",
    ctaWhatsappText: (item.fields.ctaWhatsappText as string) || "Escríbenos",
  };
}
