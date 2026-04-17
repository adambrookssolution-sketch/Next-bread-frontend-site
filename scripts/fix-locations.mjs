import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const envId = "master";

const COORDS = {
  "loc-italia-268": { lat: -13.4163105, lng: -76.1349996 },
  "loc-sucre": { lat: -13.4152617, lng: -76.1358051 },
  "loc-italia-378": { lat: -13.4159478, lng: -76.1362934 },
};

async function main() {
  // Step 1: Add coordinates to 3 missing locations
  console.log("Step 1: Fill missing coordinates");
  for (const [entryId, coords] of Object.entries(COORDS)) {
    const entry = await client.entry.get({ spaceId, environmentId: envId, entryId });
    const currentLat = entry.fields.latitude?.["en-US"];
    if (currentLat !== undefined && currentLat !== null) {
      console.log(`  ⚠ ${entryId} already has coords`);
      continue;
    }
    entry.fields.latitude = { "en-US": coords.lat };
    entry.fields.longitude = { "en-US": coords.lng };
    const updated = await client.entry.update({ spaceId, environmentId: envId, entryId }, entry);
    await client.entry.publish({ spaceId, environmentId: envId, entryId }, updated);
    console.log(`  ✓ ${entryId}: ${coords.lat}, ${coords.lng}`);
  }

  // Step 2: Hide embedQuery and mapsShareUrl fields from Location Content Type
  console.log("\nStep 2: Hide unused fields (embedQuery, mapsShareUrl)");
  const locationType = await client.contentType.get({
    spaceId,
    environmentId: envId,
    contentTypeId: "location",
  });

  for (const fieldId of ["embedQuery", "mapsShareUrl"]) {
    const f = locationType.fields.find((f) => f.id === fieldId);
    if (f) {
      f.disabled = true;
      f.omitted = true;
      f.required = false;
      console.log(`  ✓ ${fieldId} disabled + omitted`);
    }
  }

  const updatedType = await client.contentType.update(
    { spaceId, environmentId: envId, contentTypeId: "location" },
    locationType
  );
  await client.contentType.publish(
    { spaceId, environmentId: envId, contentTypeId: "location" },
    updatedType
  );
  console.log("  ✓ Location content type published");

  console.log("\n✅ Done!");
}

main().catch((e) => {
  console.error("Error:", e.message);
  if (e.details) console.error(JSON.stringify(e.details, null, 2));
});
