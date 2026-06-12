/**
 * Enriches data/counties.json and data/constituencies.json
 * with postal_code and postal_code_range fields sourced
 * from data/postal-codes.json.
 */

const fs = require('fs');
const path = require('path');

function load(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8'));
}
function save(file, data) {
  fs.writeFileSync(
    path.join(__dirname, '..', 'data', file),
    JSON.stringify(data, null, 2),
    'utf8'
  );
}

const postalCodes = load('postal-codes.json');
const counties = load('counties.json');
const constituencies = load('constituencies.json');

// Build lookups
const postalByCountyId = {};
postalCodes.forEach((p) => { postalByCountyId[p.county_id] = p; });

// constituency lookup: [county_id, lower-name] → postal_code
const postalByConstituency = {};
postalCodes.forEach((p) => {
  p.constituencies.forEach((c) => {
    postalByConstituency[`${p.county_id}:${c.name.toLowerCase()}`] = c.postal_code;
  });
});

// Enrich counties
const enrichedCounties = counties.map((county) => {
  const pc = postalByCountyId[county.id];
  if (!pc) return county;
  return {
    ...county,
    postal_code: pc.primary_postal_code,
    postal_code_range: `${pc.postal_code_range.from}-${pc.postal_code_range.to}`,
  };
});
save('counties.json', enrichedCounties);
console.log('counties.json enriched with postal_code and postal_code_range');

// Enrich constituencies
let matched = 0;
let unmatched = 0;
const enrichedConstituencies = constituencies.map((c) => {
  const key = `${c.county_id}:${c.name.toLowerCase()}`;
  const pc = postalByConstituency[key] || null;
  if (pc) matched++; else unmatched++;
  return { ...c, postal_code: pc };
});
save('constituencies.json', enrichedConstituencies);
console.log(`constituencies.json enriched — matched: ${matched}, unmatched: ${unmatched}`);
if (unmatched > 0) {
  enrichedConstituencies
    .filter((c) => c.postal_code === null)
    .forEach((c) => console.log(`  unmatched: id=${c.id} name="${c.name}" county_id=${c.county_id}`));
}
