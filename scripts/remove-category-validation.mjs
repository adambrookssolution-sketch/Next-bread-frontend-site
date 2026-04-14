import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

async function main() {
  let productType = await client.contentType.get({
    spaceId,
    environmentId: envId,
    contentTypeId: "product",
  });

  const categoryField = productType.fields.find((f) => f.id === "category");
  if (!categoryField) {
    console.log("❌ category field not found");
    return;
  }

  if (!categoryField.validations || categoryField.validations.length === 0) {
    console.log("⚠ no validations to remove");
    return;
  }

  console.log("Current validations:", JSON.stringify(categoryField.validations));
  categoryField.validations = [];

  const updated = await client.contentType.update(
    { spaceId, environmentId: envId, contentTypeId: "product" },
    productType
  );
  await client.contentType.publish(
    { spaceId, environmentId: envId, contentTypeId: "product" },
    updated
  );
  console.log("✓ category validations removed — now accepts any value");
}

main().catch(console.error);
