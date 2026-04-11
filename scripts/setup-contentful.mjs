import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

async function createContentType(id, data) {
  try {
    const existing = await client.contentType.get({ spaceId, environmentId: envId, contentTypeId: id });
    console.log(`  ⚠ ${data.name} already exists, skipping`);
    return;
  } catch (e) {
    // doesn't exist, create it
  }

  const ct = await client.contentType.createWithId({ spaceId, environmentId: envId, contentTypeId: id }, data);
  await client.contentType.publish({ spaceId, environmentId: envId, contentTypeId: id }, ct);
  console.log(`  ✓ ${data.name} created & published`);
}

async function main() {
  console.log("Creating content types...\n");

  // 1. Product
  await createContentType("product", {
    name: "Product",
    displayField: "name",
    fields: [
      { id: "name", name: "Nombre", type: "Symbol", required: true },
      {
        id: "category",
        name: "Categoría",
        type: "Symbol",
        required: true,
        validations: [
          {
            in: [
              "Panes Clásicos",
              "Panes de Molde",
              "Panes Especiales",
              "Panes Embolsados",
              "Pastelería",
            ],
          },
        ],
      },
      {
        id: "image",
        name: "Imagen",
        type: "Link",
        linkType: "Asset",
        required: true,
      },
      { id: "description", name: "Descripción", type: "Text", required: true },
      { id: "bestSeller", name: "Más Vendido", type: "Boolean", required: false },
      { id: "order", name: "Orden", type: "Integer", required: false },
    ],
  });

  // 2. Location
  await createContentType("location", {
    name: "Location",
    displayField: "name",
    fields: [
      { id: "name", name: "Nombre", type: "Symbol", required: true },
      { id: "address", name: "Dirección", type: "Symbol", required: true },
      { id: "phone", name: "Teléfono", type: "Symbol", required: true },
      { id: "hours", name: "Horarios", type: "Array", items: { type: "Symbol" }, required: true },
      { id: "mapsUrl", name: "Google Maps URL", type: "Symbol", required: true },
      { id: "mapsShareUrl", name: "Google Maps Share URL", type: "Symbol", required: false },
      { id: "embedQuery", name: "Embed Query", type: "Symbol", required: false },
      { id: "latitude", name: "Latitud", type: "Number", required: false },
      { id: "longitude", name: "Longitud", type: "Number", required: false },
      { id: "order", name: "Orden", type: "Integer", required: false },
    ],
  });

  // 3. Client (B2B logos)
  await createContentType("client", {
    name: "Client",
    displayField: "name",
    fields: [
      { id: "name", name: "Nombre", type: "Symbol", required: true },
      {
        id: "logo",
        name: "Logo",
        type: "Link",
        linkType: "Asset",
        required: true,
      },
      { id: "order", name: "Orden", type: "Integer", required: false },
    ],
  });

  // 4. Hero Section
  await createContentType("heroSection", {
    name: "Hero Section",
    displayField: "tagline",
    fields: [
      { id: "tagline", name: "Tagline", type: "Symbol", required: true },
      { id: "subtitle", name: "Subtítulo", type: "Symbol", required: false },
      {
        id: "backgroundImage",
        name: "Imagen de Fondo",
        type: "Link",
        linkType: "Asset",
        required: false,
      },
      { id: "ctaText", name: "Texto Botón Principal", type: "Symbol", required: false },
      { id: "ctaWhatsappText", name: "Texto Botón WhatsApp", type: "Symbol", required: false },
    ],
  });

  // 5. About Section
  await createContentType("aboutSection", {
    name: "About Section",
    displayField: "title",
    fields: [
      { id: "title", name: "Título", type: "Symbol", required: true },
      { id: "mision", name: "Misión", type: "Text", required: true },
      { id: "vision", name: "Visión", type: "Text", required: true },
    ],
  });

  // 6. Brand Config
  await createContentType("brandConfig", {
    name: "Brand Config",
    displayField: "name",
    fields: [
      { id: "name", name: "Nombre", type: "Symbol", required: true },
      { id: "fullName", name: "Nombre Completo", type: "Symbol", required: true },
      { id: "tagline", name: "Tagline", type: "Symbol", required: true },
      { id: "description", name: "Descripción", type: "Text", required: true },
      { id: "email", name: "Email", type: "Symbol", required: true },
      { id: "whatsapp", name: "WhatsApp", type: "Symbol", required: true },
      { id: "facebook", name: "Facebook URL", type: "Symbol", required: false },
      { id: "instagram", name: "Instagram URL", type: "Symbol", required: false },
    ],
  });

  console.log("\n✅ All content types created!");
}

main().catch(console.error);
