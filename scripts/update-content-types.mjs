import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

async function main() {
  // 1. Add "visible" field to Location
  console.log("Adding 'visible' field to Location...");
  try {
    let locationType = await client.contentType.get({
      spaceId,
      environmentId: envId,
      contentTypeId: "location",
    });

    const hasVisible = locationType.fields.some((f) => f.id === "visible");
    if (!hasVisible) {
      locationType.fields.push({
        id: "visible",
        name: "Visible",
        type: "Boolean",
        required: false,
        defaultValue: { "en-US": true },
      });

      const updated = await client.contentType.update(
        { spaceId, environmentId: envId, contentTypeId: "location" },
        locationType
      );
      await client.contentType.publish(
        { spaceId, environmentId: envId, contentTypeId: "location" },
        updated
      );
      console.log("  ✓ 'visible' field added to Location");

      // Set visible=true for all existing locations
      const entries = await client.entry.getMany({
        spaceId,
        environmentId: envId,
        query: { content_type: "location" },
      });

      for (const entry of entries.items) {
        if (entry.fields.visible === undefined) {
          entry.fields.visible = { "en-US": true };
          const updatedEntry = await client.entry.update(
            { spaceId, environmentId: envId, entryId: entry.sys.id },
            entry
          );
          await client.entry.publish(
            { spaceId, environmentId: envId, entryId: entry.sys.id },
            updatedEntry
          );
          console.log(`    ✓ Set visible=true for ${entry.fields.name["en-US"]}`);
        }
      }
    } else {
      console.log("  ⚠ 'visible' field already exists");
    }
  } catch (e) {
    console.error("  ❌ Location:", e.message);
  }

  // 2. Add "visible" field to Client
  console.log("\nAdding 'visible' field to Client...");
  try {
    let clientType = await client.contentType.get({
      spaceId,
      environmentId: envId,
      contentTypeId: "client",
    });

    const hasVisible = clientType.fields.some((f) => f.id === "visible");
    if (!hasVisible) {
      clientType.fields.push({
        id: "visible",
        name: "Visible",
        type: "Boolean",
        required: false,
        defaultValue: { "en-US": true },
      });

      const updated = await client.contentType.update(
        { spaceId, environmentId: envId, contentTypeId: "client" },
        clientType
      );
      await client.contentType.publish(
        { spaceId, environmentId: envId, contentTypeId: "client" },
        updated
      );
      console.log("  ✓ 'visible' field added to Client");

      const entries = await client.entry.getMany({
        spaceId,
        environmentId: envId,
        query: { content_type: "client" },
      });

      for (const entry of entries.items) {
        if (entry.fields.visible === undefined) {
          entry.fields.visible = { "en-US": true };
          const updatedEntry = await client.entry.update(
            { spaceId, environmentId: envId, entryId: entry.sys.id },
            entry
          );
          await client.entry.publish(
            { spaceId, environmentId: envId, entryId: entry.sys.id },
            updatedEntry
          );
          console.log(`    ✓ Set visible=true for ${entry.fields.name["en-US"]}`);
        }
      }
    } else {
      console.log("  ⚠ 'visible' field already exists");
    }
  } catch (e) {
    console.error("  ❌ Client:", e.message);
  }

  // 3. Add "visible" field to Product
  console.log("\nAdding 'visible' field to Product...");
  try {
    let productType = await client.contentType.get({
      spaceId,
      environmentId: envId,
      contentTypeId: "product",
    });

    const hasVisible = productType.fields.some((f) => f.id === "visible");
    if (!hasVisible) {
      productType.fields.push({
        id: "visible",
        name: "Visible",
        type: "Boolean",
        required: false,
        defaultValue: { "en-US": true },
      });

      const updated = await client.contentType.update(
        { spaceId, environmentId: envId, contentTypeId: "product" },
        productType
      );
      await client.contentType.publish(
        { spaceId, environmentId: envId, contentTypeId: "product" },
        updated
      );
      console.log("  ✓ 'visible' field added to Product");

      const entries = await client.entry.getMany({
        spaceId,
        environmentId: envId,
        query: { content_type: "product" },
      });

      for (const entry of entries.items) {
        if (entry.fields.visible === undefined) {
          entry.fields.visible = { "en-US": true };
          const updatedEntry = await client.entry.update(
            { spaceId, environmentId: envId, entryId: entry.sys.id },
            entry
          );
          await client.entry.publish(
            { spaceId, environmentId: envId, entryId: entry.sys.id },
            updatedEntry
          );
          console.log(`    ✓ Set visible=true for ${entry.fields.name["en-US"]}`);
        }
      }
    } else {
      console.log("  ⚠ 'visible' field already exists");
    }
  } catch (e) {
    console.error("  ❌ Product:", e.message);
  }

  // 4. Create Hero entry with current data
  console.log("\nCreating Hero entry...");
  try {
    await client.entry.get({ spaceId, environmentId: envId, entryId: "nestarez-hero" });
    console.log("  ⚠ Hero entry already exists");
  } catch (e) {
    const entry = await client.entry.createWithId(
      { spaceId, environmentId: envId, contentTypeId: "heroSection", entryId: "nestarez-hero" },
      {
        fields: {
          tagline: { "en-US": "Tradición artesanal en cada bocado" },
          subtitle: { "en-US": "panaderia y pastelería" },
          ctaText: { "en-US": "Ver Productos" },
          ctaWhatsappText: { "en-US": "Escríbenos" },
        },
      }
    );
    await client.entry.publish(
      { spaceId, environmentId: envId, entryId: "nestarez-hero" },
      entry
    );
    console.log("  ✓ Hero entry created & published");
  }

  console.log("\n✅ All updates complete!");
}

main().catch(console.error);
