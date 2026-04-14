import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  // ============ STEP 1: Create Category content type ============
  console.log("Step 1: Create Category content type");
  try {
    await client.contentType.get({
      spaceId,
      environmentId: envId,
      contentTypeId: "category",
    });
    console.log("  ⚠ Category already exists");
  } catch (e) {
    const ct = await client.contentType.createWithId(
      { spaceId, environmentId: envId, contentTypeId: "category" },
      {
        name: "Category",
        displayField: "name",
        fields: [
          { id: "name", name: "Nombre", type: "Symbol", required: true },
          { id: "order", name: "Orden", type: "Integer", required: false },
        ],
      }
    );
    await client.contentType.publish(
      { spaceId, environmentId: envId, contentTypeId: "category" },
      ct
    );
    console.log("  ✓ Category created & published");
  }

  // ============ STEP 2: Read all existing products' categories ============
  console.log("\nStep 2: Read existing product categories");
  const products = await client.entry.getMany({
    spaceId,
    environmentId: envId,
    query: { content_type: "product", limit: 100 },
  });
  console.log(`  Found ${products.items.length} products`);

  // Collect unique categories
  const uniqueCats = new Set();
  for (const p of products.items) {
    const cat = p.fields.category?.["en-US"];
    if (typeof cat === "string" && cat.trim()) {
      uniqueCats.add(cat.trim());
    }
  }
  const catList = [...uniqueCats];
  console.log(`  Unique categories: ${catList.length}`);
  catList.forEach((c) => console.log(`    - ${c}`));

  // ============ STEP 3: Create Category entries ============
  console.log("\nStep 3: Create Category entries");
  const catIdMap = {};
  let order = 1;
  for (const catName of catList) {
    const catId = `cat-${slugify(catName)}`;
    catIdMap[catName] = catId;

    try {
      await client.entry.get({ spaceId, environmentId: envId, entryId: catId });
      console.log(`  ⚠ ${catId} already exists`);
    } catch (e) {
      const entry = await client.entry.createWithId(
        { spaceId, environmentId: envId, contentTypeId: "category", entryId: catId },
        {
          fields: {
            name: { "en-US": catName },
            order: { "en-US": order },
          },
        }
      );
      await client.entry.publish(
        { spaceId, environmentId: envId, entryId: catId },
        entry
      );
      console.log(`  ✓ ${catId} created (${catName})`);
    }
    order++;
  }

  // ============ STEP 4: Rename old category field & add new categoryRef field ============
  console.log("\nStep 4: Add categoryRef field to Product content type");

  let productType = await client.contentType.get({
    spaceId,
    environmentId: envId,
    contentTypeId: "product",
  });

  const hasRef = productType.fields.some((f) => f.id === "categoryRef");
  if (!hasRef) {
    // Mark old category field as disabled and omitted (but don't delete to preserve data)
    const oldCatField = productType.fields.find((f) => f.id === "category");
    if (oldCatField) {
      oldCatField.disabled = true;
      oldCatField.omitted = true;
      oldCatField.required = false;
    }

    // Add new reference field
    productType.fields.push({
      id: "categoryRef",
      name: "Categoría",
      type: "Link",
      linkType: "Entry",
      required: false,
      validations: [{ linkContentType: ["category"] }],
    });

    const updated = await client.contentType.update(
      { spaceId, environmentId: envId, contentTypeId: "product" },
      productType
    );
    await client.contentType.publish(
      { spaceId, environmentId: envId, contentTypeId: "product" },
      updated
    );
    console.log("  ✓ categoryRef field added, old category disabled");
  } else {
    console.log("  ⚠ categoryRef field already exists");
  }

  // ============ STEP 5: Migrate each product to use categoryRef ============
  console.log("\nStep 5: Link each product to its category");
  for (const p of products.items) {
    const catName = p.fields.category?.["en-US"];
    if (!catName) {
      console.log(`  ⚠ ${p.sys.id}: no category`);
      continue;
    }
    const catId = catIdMap[catName];
    if (!catId) {
      console.log(`  ⚠ ${p.sys.id}: category not mapped: ${catName}`);
      continue;
    }

    // Re-fetch to get latest version
    const fresh = await client.entry.get({
      spaceId,
      environmentId: envId,
      entryId: p.sys.id,
    });

    // Skip if already linked
    if (fresh.fields.categoryRef?.["en-US"]?.sys?.id === catId) {
      console.log(`  ⚠ ${p.sys.id} already linked`);
      continue;
    }

    fresh.fields.categoryRef = {
      "en-US": { sys: { type: "Link", linkType: "Entry", id: catId } },
    };

    const updated = await client.entry.update(
      { spaceId, environmentId: envId, entryId: p.sys.id },
      fresh
    );
    await client.entry.publish(
      { spaceId, environmentId: envId, entryId: p.sys.id },
      updated
    );
    console.log(`  ✓ ${p.fields.name["en-US"]} → ${catName}`);
  }

  console.log("\n✅ Migration complete!");
}

main().catch((e) => {
  console.error("Error:", e.message);
  if (e.details) console.error("Details:", JSON.stringify(e.details, null, 2));
});
