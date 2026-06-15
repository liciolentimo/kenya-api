const fs   = require('fs');
const path = require('path');

async function seedWards() {
  console.log('Fetching wards data from IEBC source...');

  const res = await fetch(
    'https://raw.githubusercontent.com/alvinchesaro/' +
    'Kenya-Counties-SubCounties-and-Wards/main/' +
    'Kenya-Counties-SubCounties-and-Wards.json'
  );

  if (!res.ok) throw new Error('Fetch failed: ' + res.status);
  const raw = await res.json();

  const counties = require('../data/counties.json');
  const countyMap = {};
  counties.forEach((c) => {
    const lower = c.name.toLowerCase();
    countyMap[lower] = c.id;
    // normalise apostrophes, hyphens, and multiple spaces
    countyMap[lower.replace(/'/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim()] = c.id;
  });
  // Source-specific aliases for data errors / non-standard spellings
  countyMap['keroka'] = 46; // Keroka is a town in Nyamira county

  // Source JSON: { "County Name": { "Sub County": ["Ward1","Ward2"] } }
  const wards = [];
  let wardId = 1;
  let subCountyId = 1;

  Object.entries(raw).forEach(([countyName, subCounties]) => {
    const cleanCounty = countyName.toLowerCase().replace(/'/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    const county_id = countyMap[cleanCounty] || countyMap[countyName.toLowerCase()] || null;

    if (!county_id) {
      console.warn('Could not match county:', countyName);
    }

    Object.entries(subCounties).forEach(([subCountyName, wardList]) => {
      wardList.forEach((wardName) => {
        wards.push({
          id:              wardId++,
          sub_county_id:   subCountyId,
          sub_county_name: subCountyName,
          county_id,
          county_name:     countyName,
          ward:            wardName,
        });
      });
      subCountyId++;
    });
  });

  const wardsPath = path.join(__dirname, '../data/wards.json');
  fs.writeFileSync(wardsPath, JSON.stringify(wards, null, 2));
  console.log(`Seeded ${wards.length} wards across all counties`);
  console.log(`   Output: ${wardsPath}`);

  // Update counties.json with sub_county and ward counts
  const countiesPath = path.join(__dirname, '../data/counties.json');
  const countiesData = JSON.parse(fs.readFileSync(countiesPath));

  countiesData.forEach((county) => {
    const countyWards = wards.filter((w) => w.county_id === county.id);
    const subCounties = new Set(countyWards.map((w) => w.sub_county_name));
    county.sub_county_count = subCounties.size;
    county.ward_count       = countyWards.length;
  });

  fs.writeFileSync(countiesPath, JSON.stringify(countiesData, null, 2));
  console.log('Updated counties.json with ward counts');

  // Update constituencies.json with wards array (match sub_county_name → constituency name)
  const constituenciesPath = path.join(__dirname, '../data/constituencies.json');
  const constituenciesData = JSON.parse(fs.readFileSync(constituenciesPath));

  // Build lookup: lowercase sub_county_name → [ward names]
  const wardsBySubCounty = {};
  wards.forEach((w) => {
    const key = w.sub_county_name.toLowerCase().trim();
    if (!wardsBySubCounty[key]) wardsBySubCounty[key] = [];
    wardsBySubCounty[key].push(w.ward);
  });

  let matchCount = 0;
  constituenciesData.forEach((c) => {
    const key = c.name.toLowerCase().trim();
    if (wardsBySubCounty[key]) {
      c.wards = wardsBySubCounty[key];
      matchCount++;
    } else {
      c.wards = [];
    }
  });

  fs.writeFileSync(constituenciesPath, JSON.stringify(constituenciesData, null, 2));
  console.log(`Updated constituencies.json — ${matchCount}/290 constituencies matched sub-county wards`);
}

seedWards().catch(console.error);
