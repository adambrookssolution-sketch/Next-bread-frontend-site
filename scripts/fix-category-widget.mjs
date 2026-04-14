import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

async function main() {
  // Set Editor Interface to singleLine text input for category field
  console.log("Updating Editor Interface for Product.category field...");

  const ei = await client.editorInterface.get({
    spaceId,
    environmentId: envId,
    contentTypeId: "product",
  });

  console.log("Current controls:");
  ei.controls?.forEach((c) => {
    console.log(`  - ${c.fieldId}: ${c.widgetId || "default"}`);
  });

  // Find and update the category control
  const categoryControl = ei.controls?.find((c) => c.fieldId === "category");
  if (categoryControl) {
    categoryControl.widgetId = "singleLine";
    categoryControl.widgetNamespace = "builtin";
  } else {
    ei.controls = ei.controls || [];
    ei.controls.push({
      fieldId: "category",
      widgetId: "singleLine",
      widgetNamespace: "builtin",
    });
  }

  const updated = await client.editorInterface.update(
    { spaceId, environmentId: envId, contentTypeId: "product" },
    ei
  );

  console.log("\nUpdated controls:");
  updated.controls?.forEach((c) => {
    console.log(`  - ${c.fieldId}: ${c.widgetId || "default"}`);
  });

  console.log("\n✅ Category field now uses free text input (singleLine)");
}

main().catch((e) => {
  console.error("Error:", e.message);
  if (e.details) console.error("Details:", JSON.stringify(e.details));
});
