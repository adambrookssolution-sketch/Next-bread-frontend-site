import { createClient } from "contentful-management";
import { readFileSync } from "fs";
import { resolve } from "path";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";
const publicDir = resolve(process.cwd(), "public");

// Helper: upload an image file to Contentful and return the asset
async function uploadAsset(filePath, title, contentType = "image/jpeg") {
  const fullPath = resolve(publicDir, filePath.replace(/^\//, ""));
  const fileData = readFileSync(fullPath);

  // Create upload
  const upload = await client.upload.create({ spaceId }, { file: fileData });

  // Create asset
  const asset = await client.asset.create(
    { spaceId, environmentId: envId },
    {
      fields: {
        title: { "en-US": title },
        file: {
          "en-US": {
            contentType,
            fileName: filePath.split("/").pop(),
            uploadFrom: {
              sys: { type: "Link", linkType: "Upload", id: upload.sys.id },
            },
          },
        },
      },
    }
  );

  // Process asset
  await client.asset.processForLocale(
    { spaceId, environmentId: envId },
    asset,
    "en-US"
  );

  // Wait for processing
  let processed;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    processed = await client.asset.get({
      spaceId,
      environmentId: envId,
      assetId: asset.sys.id,
    });
    if (processed.fields.file?.["en-US"]?.url) break;
  }

  // Publish asset
  await client.asset.publish(
    { spaceId, environmentId: envId, assetId: processed.sys.id },
    processed
  );

  console.log(`    📷 Uploaded: ${title}`);
  return processed.sys.id;
}

// Helper: create and publish an entry
async function createEntry(contentTypeId, entryId, fields) {
  try {
    await client.entry.get({
      spaceId,
      environmentId: envId,
      entryId,
    });
    console.log(`  ⚠ ${entryId} already exists, skipping`);
    return;
  } catch (e) {
    // doesn't exist
  }

  const entry = await client.entry.createWithId(
    { spaceId, environmentId: envId, contentTypeId, entryId },
    { fields }
  );
  await client.entry.publish(
    { spaceId, environmentId: envId, entryId },
    entry
  );
  console.log(`  ✓ ${entryId}`);
}

// Wrap field values in locale
function localize(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = { "en-US": value };
  }
  return result;
}

function assetLink(assetId) {
  return { sys: { type: "Link", linkType: "Asset", id: assetId } };
}

async function main() {
  const step = process.argv[2] || "all";

  // ============ STEP 1: Brand Config ============
  if (step === "all" || step === "brand") {
    console.log("\n📦 Migrating Brand Config...");
    await createEntry("brandConfig", "nestarez-brand", localize({
      name: "Nestarez",
      fullName: "Panadería y Pastelería Nestarez",
      tagline: "Tradición artesanal en cada bocado",
      description: "Elaboramos productos de panadería de calidad con pasión artesanal, seleccionando los mejores insumos para llevar tradición y sabor a tu mesa.",
      email: "admin@panaderianestarez.com",
      whatsapp: "956660316",
      facebook: "https://www.facebook.com/PanaderiaNestarez",
      instagram: "",
    }));
  }

  // ============ STEP 2: About Section ============
  if (step === "all" || step === "about") {
    console.log("\n📦 Migrating About Section...");
    await createEntry("aboutSection", "nestarez-about", localize({
      title: "Nuestra Historia",
      mision: "Elaborar y ofrecer productos de panadería de calidad a un precio justo, seleccionando adecuadamente nuestros insumos e innovando en tecnología y procesos, para satisfacer a nuestros clientes, y creando lazos de confianza en cada uno de nuestros productos.",
      vision: "Ser una panadería reconocida a nivel regional, con presencia física en diferentes puntos de la región. Posicionarnos en las redes sociales y tener comunicación activa con nuestros clientes y mantener nuestro compromiso de ofrecer productos de calidad.",
    }));
  }

  // ============ STEP 3: Locations ============
  if (step === "all" || step === "locations") {
    console.log("\n📦 Migrating Locations...");

    const locations = [
      {
        id: "grocio-prado",
        name: "Panadería Nestarez",
        address: "Av. Grocio Prado 608, Pueblo Nuevo 11701",
        phone: "956660316",
        hours: ["Lunes a Sábado: 5:30 - 21:30", "Domingos: 5:30 - 12:00 y 17:30 - 21:00"],
        mapsUrl: "https://maps.app.goo.gl/k8Kooa3FmiKbPWP86",
        mapsShareUrl: "https://share.google/9rigFnIBkHhXGXSyx",
        embedQuery: "Panadería+Nestarez+Av+Grocio+Prado+608+Pueblo+Nuevo+Chincha",
        latitude: -13.4054193,
        longitude: -76.1264098,
        order: 1,
      },
      {
        id: "sucre",
        name: "Panadería y Pastelería Nestarez",
        address: "C. Sucre 351, Chincha Alta 11701",
        phone: "976456905",
        hours: ["Lunes a Sábado: 6:00 - 20:00", "Domingos: 6:00 - 19:00"],
        mapsUrl: "https://maps.app.goo.gl/7eGT3Gqyd9JY81hp9",
        mapsShareUrl: "https://share.google/3w6q0gzVtrxEa4TQY",
        embedQuery: "Panadería+y+Pastelería+Nestarez+Sucre+351+Chincha+Alta",
        order: 2,
      },
      {
        id: "italia-378",
        name: "Panadería y Pastelería Nestarez",
        address: "Jirón Italia 378, Chincha Alta 11701",
        phone: "902599497",
        hours: ["Lunes a Domingo: 5:30 - 21:30"],
        mapsUrl: "https://maps.app.goo.gl/4hiqud7EWUpPVYtj9",
        mapsShareUrl: "https://share.google/NYtWIWXTwXOswevKF",
        embedQuery: "Panadería+y+Pastelería+Nestarez+Jirón+Italia+378+Chincha+Alta",
        order: 3,
      },
      {
        id: "italia-268",
        name: "Panadería y Pastelería Nestarez",
        address: "Jirón Italia 268, Chincha Alta 11701",
        phone: "959059749",
        hours: ["Lunes a Sábado: 7:00 - 20:00", "Domingos: 7:00 - 14:00"],
        mapsUrl: "https://maps.app.goo.gl/r1BEgbaGvdzAKZwU6",
        mapsShareUrl: "https://share.google/KTEsJHR4zILwgbS61",
        embedQuery: "Panadería+y+Pastelería+Nestarez+Jirón+Italia+268+Chincha+Alta",
        order: 4,
      },
    ];

    for (const loc of locations) {
      const { id, ...fields } = loc;
      await createEntry("location", `loc-${id}`, localize(fields));
    }
  }

  // ============ STEP 4: Products (with images) ============
  if (step === "all" || step === "products") {
    console.log("\n📦 Migrating Products (with images)...");

    const products = [
      { id: "galletas-de-agua", name: "Galletas de Agua", category: "Panes Embolsados", image: "/images/products/30.jpg", description: "Nuestro producto estrella. Crujientes, ligeras y con el sabor artesanal que nos define. El motivo de nuestro isologo.", bestSeller: true, order: 1 },
      { id: "pan-frances", name: "Pan Francés", category: "Panes Clásicos", image: "/images/products/91.jpg", description: "El clásico pan francés de corteza crujiente y miga suave, ideal para acompañar cada comida.", order: 2 },
      { id: "pan-ovalado", name: "Pan Ovalado", category: "Panes Clásicos", image: "/images/products/55.jpg", description: "Pan artesanal de forma ovalada, corteza dorada y miga tierna.", order: 3 },
      { id: "pan-trenzado", name: "Pan Trenzado", category: "Panes Clásicos", image: "/images/products/99.jpg", description: "Pan trenzado artesanal con corteza dorada y aroma incomparable.", order: 4 },
      { id: "pan-redondo", name: "Pan Redondo", category: "Panes Clásicos", image: "/images/products/109.jpg", description: "Pan redondo tradicional con corteza firme y miga esponjosa, perfecto para el día a día.", order: 5 },
      { id: "pan-de-molde-blanco", name: "Pan de Molde Blanco", category: "Panes de Molde", image: "/images/products/pan-molde-blanco.jpg", description: "Pan de molde clásico, suave y esponjoso, ideal para sándwiches y tostadas.", order: 6 },
      { id: "pan-de-molde-integral", name: "Pan de Molde Integral", category: "Panes de Molde", image: "/images/products/68.jpg", description: "Pan de molde integral con la fibra y el sabor de los granos enteros.", order: 7 },
      { id: "pan-de-hamburguesa", name: "Pan de Hamburguesa", category: "Panes Especiales", image: "/images/products/105.jpg", description: "Pan suave con sésamo, perfecto para tus hamburguesas favoritas.", order: 8 },
      { id: "pan-de-yema", name: "Pan de Yema", category: "Panes Especiales", image: "/images/products/102.jpg", description: "Pan dulce de yema con sésamo, suave por dentro y dorado por fuera. Un clásico de la panadería peruana.", order: 9 },
      { id: "pan-de-yema-redondo", name: "Pan de Yema Redondo", category: "Panes Especiales", image: "/images/products/117.jpg", description: "Versión redonda de nuestro pan de yema, con la misma suavidad y sabor inconfundible.", order: 10 },
      { id: "pan-redondo-integral", name: "Pan Integral Redondo", category: "Panes Especiales", image: "/images/products/114.jpg", description: "Pan redondo elaborado con harina integral, nutritivo y con sabor auténtico.", order: 11 },
      { id: "enrollado", name: "Enrollado", category: "Panes Embolsados", image: "/images/products/95.jpg", description: "Delicioso enrollado artesanal con masa hojaldrada y suave.", order: 12 },
      { id: "galleta-artesanal", name: "Galleta Artesanal", category: "Panes Embolsados", image: "/images/products/80.jpg", description: "Galletas horneadas con receta tradicional y sabor único.", order: 13 },
      { id: "bizcocho", name: "Bizcocho", category: "Pastelería", image: "/images/products/72.jpg", description: "Bizcocho casero horneado con dedicación y los mejores ingredientes.", order: 14 },
      { id: "queque", name: "Queque Casero", category: "Pastelería", image: "/images/products/75.jpg", description: "Queque tradicional con miga húmeda y sabor a hogar, perfecto para la hora del té.", order: 15 },
      { id: "muffin", name: "Muffin Artesanal", category: "Pastelería", image: "/images/products/63.jpg", description: "Muffin artesanal con textura húmeda y sabor irresistible.", order: 16 },
      { id: "muffin-chocolate", name: "Muffin de Chocolate", category: "Pastelería", image: "/images/products/65.jpg", description: "Muffin de chocolate intenso con trocitos de cacao, para los amantes del chocolate.", order: 17 },
    ];

    for (const product of products) {
      const { id, image, ...fields } = product;
      try {
        // Check if entry already exists
        await client.entry.get({ spaceId, environmentId: envId, entryId: `prod-${id}` });
        console.log(`  ⚠ prod-${id} already exists, skipping`);
        continue;
      } catch (e) {
        // doesn't exist, proceed
      }

      const assetId = await uploadAsset(image, fields.name);
      const entryFields = localize({ ...fields, image: assetLink(assetId) });
      // Fix: image should not be double-localized
      entryFields.image = { "en-US": assetLink(assetId) };

      const entry = await client.entry.createWithId(
        { spaceId, environmentId: envId, contentTypeId: "product", entryId: `prod-${id}` },
        { fields: entryFields }
      );
      await client.entry.publish(
        { spaceId, environmentId: envId, entryId: `prod-${id}` },
        entry
      );
      console.log(`  ✓ prod-${id}`);
    }
  }

  // ============ STEP 5: Clients (with logos) ============
  if (step === "all" || step === "clients") {
    console.log("\n📦 Migrating Clients (with logos)...");

    const clients = [
      { id: "la-calera", name: "La Calera Agrícola", logo: "/images/clients/la-calera.jpeg" },
      { id: "farma-claudia", name: "Farma Claudia", logo: "/images/clients/farma-claudia.jpeg" },
      { id: "diamond-bridge", name: "Diamond Bridge", logo: "/images/clients/diamond-bridge.jpeg" },
      { id: "municipalidad-chincha-baja", name: "Municipalidad Distrital de Chincha Baja", logo: "/images/clients/municipalidad-chincha-baja.jpeg" },
      { id: "neo-mg-group", name: "NEO MG Group S.A.C.", logo: "/images/clients/neo-mg-group.jpeg" },
      { id: "comertesa", name: "COMERTESA - Comercial Tres Estrellas S.A.", logo: "/images/clients/comertesa.jpeg" },
      { id: "clinica-famisalud", name: "Clínica FamiSalud", logo: "/images/clients/clinica-famisalud.jpeg" },
    ];

    let order = 1;
    for (const cl of clients) {
      const { id, logo, ...fields } = cl;
      try {
        await client.entry.get({ spaceId, environmentId: envId, entryId: `client-${id}` });
        console.log(`  ⚠ client-${id} already exists, skipping`);
        order++;
        continue;
      } catch (e) {
        // doesn't exist
      }

      const assetId = await uploadAsset(logo, fields.name);
      const entry = await client.entry.createWithId(
        { spaceId, environmentId: envId, contentTypeId: "client", entryId: `client-${id}` },
        {
          fields: {
            name: { "en-US": fields.name },
            logo: { "en-US": assetLink(assetId) },
            order: { "en-US": order },
          },
        }
      );
      await client.entry.publish(
        { spaceId, environmentId: envId, entryId: `client-${id}` },
        entry
      );
      console.log(`  ✓ client-${id}`);
      order++;
    }
  }

  console.log("\n✅ Migration complete!");
}

main().catch(console.error);
