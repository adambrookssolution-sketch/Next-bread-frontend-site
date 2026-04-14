import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

// Fixed category list requested by client
const CATEGORIES = [
  "Panes a Granel",
  "Panes Embolsados",
  "Panes de Molde",
  "Tostadas",
  "Galletas",
  "Pasteleria",
  "Pasteleria Fina",
];

// Map existing category names to new canonical names (preserves migrated data)
const CATEGORY_ALIAS = {
  "Pastelería": "Pasteleria",
  "pasteleria": "Pasteleria",
};

async function main() {
  // ============ STEP 1: Re-enable old category field + add validation ============
  console.log("Step 1: Re-enable Product.category as required string with validation");

  let productType = await client.contentType.get({
    spaceId,
    environmentId: envId,
    contentTypeId: "product",
  });

  const categoryField = productType.fields.find((f) => f.id === "category");
  if (!categoryField) {
    throw new Error("category field not found on Product");
  }

  categoryField.disabled = false;
  categoryField.omitted = false;
  categoryField.required = true;
  categoryField.validations = [{ in: CATEGORIES }];

  // Hide categoryRef field (cannot delete directly; Contentful requires deprecation step)
  const catRefField = productType.fields.find((f) => f.id === "categoryRef");
  if (catRefField) {
    catRefField.disabled = true;
    catRefField.omitted = true;
    catRefField.required = false;
  }

  const updated = await client.contentType.update(
    { spaceId, environmentId: envId, contentTypeId: "product" },
    productType
  );
  await client.contentType.publish(
    { spaceId, environmentId: envId, contentTypeId: "product" },
    updated
  );
  console.log("  ✓ category field re-enabled with dropdown validation");
  console.log("  ✓ categoryRef field removed");

  // ============ STEP 2: Restore dropdown widget in Editor Interface ============
  console.log("\nStep 2: Restore dropdown widget for category field");

  const ei = await client.editorInterface.get({
    spaceId,
    environmentId: envId,
    contentTypeId: "product",
  });

  const catControl = ei.controls?.find((c) => c.fieldId === "category");
  if (catControl) {
    catControl.widgetId = "dropdown";
    catControl.widgetNamespace = "builtin";
  }

  // Remove categoryRef control if present
  ei.controls = ei.controls?.filter((c) => c.fieldId !== "categoryRef");

  await client.editorInterface.update(
    { spaceId, environmentId: envId, contentTypeId: "product" },
    ei
  );
  console.log("  ✓ category widget set to dropdown");

  // ============ STEP 3: Normalize existing product category values ============
  console.log("\nStep 3: Normalize product category values");

  const products = await client.entry.getMany({
    spaceId,
    environmentId: envId,
    query: { content_type: "product", limit: 100 },
  });

  for (const p of products.items) {
    const current = p.fields.category?.["en-US"];
    if (!current) {
      console.log(`  ⚠ ${p.sys.id}: no category, skipping`);
      continue;
    }

    const normalized = CATEGORY_ALIAS[current] || current;
    if (!CATEGORIES.includes(normalized)) {
      console.log(`  ⚠ ${p.sys.id}: category "${current}" not in list, needs manual fix`);
      continue;
    }

    // Re-fetch fresh version
    const fresh = await client.entry.get({
      spaceId,
      environmentId: envId,
      entryId: p.sys.id,
    });

    let needsSave = false;
    if (fresh.fields.category?.["en-US"] !== normalized) {
      fresh.fields.category["en-US"] = normalized;
      needsSave = true;
    }

    // Ensure image is present (some drafts had missing image)
    if (!fresh.fields.image) {
      console.log(`  ⚠ ${p.sys.id}: no image in draft, skipping publish`);
      continue;
    }

    if (needsSave) {
      const updatedEntry = await client.entry.update(
        { spaceId, environmentId: envId, entryId: p.sys.id },
        fresh
      );
      await client.entry.publish(
        { spaceId, environmentId: envId, entryId: p.sys.id },
        updatedEntry
      );
      console.log(`  ✓ ${fresh.fields.name["en-US"]}: "${current}" → "${normalized}"`);
    } else {
      // Still need to republish if content type changed
      try {
        await client.entry.publish(
          { spaceId, environmentId: envId, entryId: p.sys.id },
          fresh
        );
        console.log(`  ✓ ${fresh.fields.name["en-US"]}: republished with ${normalized}`);
      } catch (e) {
        console.log(`  ⚠ ${fresh.fields.name["en-US"]}: publish failed — ${e.message}`);
      }
    }
  }

  console.log("\n✅ Revert complete!");
  console.log("\nFinal categories:");
  CATEGORIES.forEach((c) => console.log("  - " + c));
}

main().catch((e) => {
  console.error("Error:", e.message);
  if (e.details) console.error("Details:", JSON.stringify(e.details, null, 2));
});
