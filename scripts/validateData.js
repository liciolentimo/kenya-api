const fs = require('fs');
const path = require('path');

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', p), 'utf8'));
}

function logPass(msg) { console.log('PASS:', msg); }
function logFail(msg) { console.error('FAIL:', msg); }

function run() {
  const constituencies = loadJSON('data/constituencies.json');
  const counties = loadJSON('data/counties.json');
  const population = loadJSON('data/population.json');
  const ministries = loadJSON('data/ministries.json');
  const institutions = loadJSON('data/institutions.json');
  const postalCodes = loadJSON('data/postal-codes.json');
  const wardsArr = loadJSON('data/wards.json');
  const parksArr = loadJSON('data/parks.json');
  const presidentsFile = loadJSON('data/presidents.json');
  const presidentsArr = presidentsFile.presidents;
  const parastatalsArr = loadJSON('data/parastatals.json');

  let ok = true;

  // 1. Confirm count == 290
  if (constituencies.length === 290) {
    logPass('constituencies.json contains 290 entries');
  } else {
    logFail(`expected 290 constituencies, found ${constituencies.length}`);
    ok = false;
  }

  const countyIds = new Set(counties.map((c) => c.id));

  // 2. Confirm every county_id in constituencies.json exists
  const invalidCounty = constituencies.filter((c) => !countyIds.has(c.county_id));
  if (invalidCounty.length === 0) {
    logPass('All constituency county_id values match a county in counties.json');
  } else {
    logFail('Some constituencies reference invalid county_id values:');
    invalidCounty.forEach((c) => console.error(`  id=${c.id} county_id=${c.county_id} name="${c.name}"`));
    ok = false;
  }

  // 3. Confirm no duplicate constituency codes
  const codes = constituencies.map((c) => c.code);
  const dup = codes.filter((c, i) => codes.indexOf(c) !== i);
  if (dup.length === 0) {
    logPass('No duplicate constituency codes found');
  } else {
    logFail('Duplicate constituency codes: ' + Array.from(new Set(dup)).join(', '));
    ok = false;
  }

  // 4. population.json count validation
  if (population.length === 47) {
    logPass('population.json contains 47 entries');
  } else {
    logFail(`expected 47 population entries, found ${population.length}`);
    ok = false;
  }

  // 5. Confirm population county ids are valid
  const invalidPopCounties = population.filter((p) => !countyIds.has(p.county_id));
  if (invalidPopCounties.length === 0) {
    logPass('All population county_id values match a county in counties.json');
  } else {
    logFail('Some population entries reference invalid county_id values:');
    invalidPopCounties.forEach((item) => console.error(`  county_id=${item.county_id} county_name="${item.county_name}"`));
    ok = false;
  }

  // 6. Confirm no county missing area_km2
  const missingArea = counties.filter((c) => c.area_km2 == null);
  if (missingArea.length === 0) {
    logPass('All counties include area_km2');
  } else {
    logFail('Some counties are missing area_km2:');
    missingArea.forEach((c) => console.error(`  id=${c.id} name="${c.name}"`));
    ok = false;
  }

  // 7. Confirm no county missing headquarters
  const missingHeadquarters = counties.filter((c) => !c.headquarters);
  if (missingHeadquarters.length === 0) {
    logPass('All counties include headquarters');
  } else {
    logFail('Some counties are missing headquarters:');
    missingHeadquarters.forEach((c) => console.error(`  id=${c.id} name="${c.name}"`));
    ok = false;
  }

  // 8. Confirm every county has a non-empty governor field
  const missingGovernor = counties.filter((c) => !c.governor);
  if (missingGovernor.length === 0) {
    logPass('All counties include governor');
  } else {
    logFail('Some counties are missing governor:');
    missingGovernor.forEach((c) => console.error(`  id=${c.id} name="${c.name}"`));
    ok = false;
  }

  // 9. Confirm every county has a non-empty governor_party field
  const missingParty = counties.filter((c) => !c.governor_party);
  if (missingParty.length === 0) {
    logPass('All counties include governor_party');
  } else {
    logFail('Some counties are missing governor_party:');
    missingParty.forEach((c) => console.error(`  id=${c.id} name="${c.name}"`));
    ok = false;
  }

  // 10. Confirm governor_since is 2022 for all counties
  const wrongYear = counties.filter((c) => c.governor_since !== 2022);
  if (wrongYear.length === 0) {
    logPass('All counties have governor_since === 2022');
  } else {
    logFail('Some counties have incorrect governor_since value:');
    wrongYear.forEach((c) => console.error(`  id=${c.id} name="${c.name}" governor_since=${c.governor_since}`));
    ok = false;
  }

  // 11. Confirm every county has a non-empty flag_url
  const missingFlag = counties.filter((c) => !c.flag_url);
  if (missingFlag.length === 0) {
    logPass('All counties include flag_url');
  } else {
    logFail('Some counties are missing flag_url:');
    missingFlag.forEach((c) => console.error(`  id=${c.id} name="${c.name}"`));
    ok = false;
  }

  // 12. Confirm all flag_urls point to Wikimedia Commons
  const badFlag = counties.filter((c) => c.flag_url && !c.flag_url.startsWith('https://upload.wikimedia.org'));
  if (badFlag.length === 0) {
    logPass('All flag_url values point to upload.wikimedia.org');
  } else {
    logFail('Some flag_url values do not point to upload.wikimedia.org:');
    badFlag.forEach((c) => console.error(`  id=${c.id} name="${c.name}" flag_url="${c.flag_url}"`));
    ok = false;
  }

  // 13. Report unique parties
  const parties = [...new Set(counties.map((c) => c.governor_party))].sort();
  logPass(`Unique parties (${parties.length}): ${parties.join(', ')}`);

  // 14. Confirm every county has a non-empty description
  const missingDesc = counties.filter((c) => !c.description);
  if (missingDesc.length === 0) {
    logPass('All counties include description');
  } else {
    logFail('Some counties are missing description:');
    missingDesc.forEach((c) => console.error(`  id=${c.id} name="${c.name}"`));
    ok = false;
  }

  // 15. Confirm all descriptions are at least 20 characters
  const shortDesc = counties.filter((c) => c.description && c.description.length < 20);
  if (shortDesc.length === 0) {
    logPass('All descriptions are at least 20 characters');
  } else {
    logFail('Some descriptions are too short (< 20 chars):');
    shortDesc.forEach((c) => console.error(`  id=${c.id} name="${c.name}" length=${c.description.length}`));
    ok = false;
  }

  // 16. ministries.json has exactly 22 entries
  if (ministries.length === 22) {
    logPass('ministries.json contains 22 entries');
  } else {
    logFail(`expected 22 ministries, found ${ministries.length}`);
    ok = false;
  }

  // 17. Every ministry has a non-empty cabinet_secretary
  const missingCS = ministries.filter((m) => !m.cabinet_secretary);
  if (missingCS.length === 0) {
    logPass('All ministries include cabinet_secretary');
  } else {
    logFail('Some ministries are missing cabinet_secretary:');
    missingCS.forEach((m) => console.error(`  id=${m.id} ministry="${m.ministry}"`));
    ok = false;
  }

  // 18. Every ministry has a non-empty image_url
  const missingImage = ministries.filter((m) => !m.image_url);
  if (missingImage.length === 0) {
    logPass('All ministries include image_url');
  } else {
    logFail('Some ministries are missing image_url:');
    missingImage.forEach((m) => console.error(`  id=${m.id} ministry="${m.ministry}"`));
    ok = false;
  }

  // 19. All image_urls start with https://
  const badImage = ministries.filter((m) => m.image_url && !m.image_url.startsWith('https://'));
  if (badImage.length === 0) {
    logPass('All ministry image_url values start with https://');
  } else {
    logFail('Some image_url values do not start with https://:');
    badImage.forEach((m) => console.error(`  id=${m.id} image_url="${m.image_url}"`));
    ok = false;
  }

  // 20. No duplicate ministry names
  const ministryNames = ministries.map((m) => m.ministry);
  const dupMinistries = ministryNames.filter((n, i) => ministryNames.indexOf(n) !== i);
  if (dupMinistries.length === 0) {
    logPass('No duplicate ministry names found');
  } else {
    logFail('Duplicate ministry names: ' + Array.from(new Set(dupMinistries)).join(', '));
    ok = false;
  }

  // 21–24: university checks
  // 21. institutions.json has at least 41 universities
  const universities = institutions.filter((i) => i.type === 'University');
  if (universities.length >= 41) {
    logPass(`institutions.json contains ${universities.length} universities (≥ 41)`);
  } else {
    logFail(`expected at least 41 universities, found ${universities.length}`);
    ok = false;
  }

  // 22. Every university has a non-null initials field
  const missingInitials = universities.filter((u) => !u.initials);
  if (missingInitials.length === 0) {
    logPass('All universities have a non-null initials field');
  } else {
    logFail('Some universities are missing initials:');
    missingInitials.forEach((u) => console.error(`  id=${u.id} name="${u.name}"`));
    ok = false;
  }

  // 23. Every university county_id maps to a valid county
  const invalidUniCounty = universities.filter((u) => !countyIds.has(u.county_id));
  if (invalidUniCounty.length === 0) {
    logPass('All university county_id values match a county in counties.json');
  } else {
    logFail('Some universities reference invalid county_id values:');
    invalidUniCounty.forEach((u) => console.error(`  id=${u.id} name="${u.name}" county_id=${u.county_id}`));
    ok = false;
  }

  // 24. No two universities share the same initials
  const initialsArr = universities.map((u) => u.initials);
  const dupInitials = initialsArr.filter((v, i) => initialsArr.indexOf(v) !== i);
  if (dupInitials.length === 0) {
    logPass('No duplicate university initials found');
  } else {
    logFail('Duplicate university initials: ' + Array.from(new Set(dupInitials)).join(', '));
    ok = false;
  }

  // 35. Exactly 12 private universities
  const privateUniversities = universities.filter((u) => u.category === 'Private');
  if (privateUniversities.length === 12) {
    logPass('institutions.json contains exactly 12 private universities');
  } else {
    logFail(`expected 12 private universities, found ${privateUniversities.length}`);
    ok = false;
  }

  // 36. At least 41 public universities
  const publicUniversities = universities.filter((u) => u.category === 'Public');
  if (publicUniversities.length >= 41) {
    logPass(`institutions.json contains ${publicUniversities.length} public universities (≥ 41)`);
  } else {
    logFail(`expected at least 41 public universities, found ${publicUniversities.length}`);
    ok = false;
  }

  // 37. Every private university has a non-empty email
  const missingPrivEmail = privateUniversities.filter((u) => !u.email);
  if (missingPrivEmail.length === 0) {
    logPass('All private universities have a non-empty email');
  } else {
    logFail('Some private universities are missing email:');
    missingPrivEmail.forEach((u) => console.error(`  id=${u.id} name="${u.name}"`));
    ok = false;
  }

  // 38. Every private university has a non-empty phone
  const missingPrivPhone = privateUniversities.filter((u) => !u.phone);
  if (missingPrivPhone.length === 0) {
    logPass('All private universities have a non-empty phone');
  } else {
    logFail('Some private universities are missing phone:');
    missingPrivPhone.forEach((u) => console.error(`  id=${u.id} name="${u.name}"`));
    ok = false;
  }

  // 39. Every private university has a non-empty address
  const missingPrivAddress = privateUniversities.filter((u) => !u.address);
  if (missingPrivAddress.length === 0) {
    logPass('All private universities have a non-empty address');
  } else {
    logFail('Some private universities are missing address:');
    missingPrivAddress.forEach((u) => console.error(`  id=${u.id} name="${u.name}"`));
    ok = false;
  }

  // 25–27: TVET checks
  const tvetTypes = ['Technical and Vocational College (TVET)', 'National Polytechnic'];
  const tvets = institutions.filter((i) => tvetTypes.includes(i.type));

  // 25. At least 600 TVET institutions
  if (tvets.length >= 600) {
    logPass(`institutions.json contains ${tvets.length} TVET institutions (≥ 600)`);
  } else {
    logFail(`expected at least 600 TVET institutions, found ${tvets.length}`);
    ok = false;
  }

  // 26. Every TVET has a non-empty county_name
  const missingTvetCountyName = tvets.filter((t) => !t.county_name);
  if (missingTvetCountyName.length === 0) {
    logPass('All TVET institutions have a non-empty county_name');
  } else {
    logFail('Some TVET institutions are missing county_name:');
    missingTvetCountyName.forEach((t) => console.error(`  id=${t.id} name="${t.name}"`));
    ok = false;
  }

  // 27. Every TVET county_id maps to a valid county
  const invalidTvetCounty = tvets.filter((t) => !countyIds.has(t.county_id));
  if (invalidTvetCounty.length === 0) {
    logPass('All TVET county_id values match a county in counties.json');
  } else {
    logFail('Some TVET institutions reference invalid county_id values:');
    invalidTvetCounty.forEach((t) => console.error(`  id=${t.id} name="${t.name}" county_id=${t.county_id}`));
    ok = false;
  }

  // 28–30: postal codes checks
  // 28. postal-codes.json has exactly 47 entries
  if (postalCodes.length === 47) {
    logPass('postal-codes.json contains 47 entries');
  } else {
    logFail(`expected 47 postal code entries, found ${postalCodes.length}`);
    ok = false;
  }

  // 29. Every entry has a non-empty primary_postal_code
  const missingPostalCode = postalCodes.filter((p) => !p.primary_postal_code);
  if (missingPostalCode.length === 0) {
    logPass('All postal code entries have a non-empty primary_postal_code');
  } else {
    logFail('Some postal code entries are missing primary_postal_code:');
    missingPostalCode.forEach((p) => console.error(`  id=${p.id} county="${p.county_name}"`));
    ok = false;
  }

  // 30. Every county_id in postal-codes.json maps to a valid county
  const invalidPostalCounty = postalCodes.filter((p) => !countyIds.has(p.county_id));
  if (invalidPostalCounty.length === 0) {
    logPass('All postal code county_id values match a county in counties.json');
  } else {
    logFail('Some postal code entries reference invalid county_id values:');
    invalidPostalCounty.forEach((p) => console.error(`  id=${p.id} county_id=${p.county_id} name="${p.county_name}"`));
    ok = false;
  }

  // 31. wards.json has at least 1200 entries (source covers 45/47 counties)
  if (wardsArr.length >= 1200) {
    logPass(`wards.json contains ${wardsArr.length} entries (≥ 1200)`);
  } else {
    logFail(`expected at least 1200 ward entries, found ${wardsArr.length}`);
    ok = false;
  }

  // 32. Every ward has a non-null county_id
  const wardsNullCounty = wardsArr.filter((w) => w.county_id === null);
  if (wardsNullCounty.length === 0) {
    logPass('All wards have a non-null county_id');
  } else {
    logFail(`${wardsNullCounty.length} wards have null county_id`);
    wardsNullCounty.slice(0, 5).forEach((w) => console.error(`  id=${w.id} ward="${w.ward}" county_name="${w.county_name}"`));
    ok = false;
  }

  // 33. Every ward has a non-empty ward name
  const wardsNoName = wardsArr.filter((w) => !w.ward || !w.ward.trim());
  if (wardsNoName.length === 0) {
    logPass('All wards have a non-empty ward name');
  } else {
    logFail(`${wardsNoName.length} wards are missing a ward name`);
    wardsNoName.forEach((w) => console.error(`  id=${w.id}`));
    ok = false;
  }

  // 34. Every ward has a non-empty sub_county_name
  const wardsNoSubCounty = wardsArr.filter((w) => !w.sub_county_name || !w.sub_county_name.trim());
  if (wardsNoSubCounty.length === 0) {
    logPass('All wards have a non-empty sub_county_name');
  } else {
    logFail(`${wardsNoSubCounty.length} wards are missing sub_county_name`);
    wardsNoSubCounty.forEach((w) => console.error(`  id=${w.id}`));
    ok = false;
  }

  // 40. parks.json has exactly 35 entries
  if (parksArr.length === 35) {
    logPass('parks.json contains exactly 35 entries');
  } else {
    logFail(`expected 35 parks, found ${parksArr.length}`);
    ok = false;
  }

  // 41. Every park has a non-empty county_ids array
  const parksNoCounty = parksArr.filter((p) => !Array.isArray(p.county_ids) || p.county_ids.length === 0);
  if (parksNoCounty.length === 0) {
    logPass('All parks have a non-empty county_ids array');
  } else {
    logFail(`${parksNoCounty.length} parks are missing county_ids`);
    parksNoCounty.forEach((p) => console.error(`  id=${p.id} name="${p.name}"`));
    ok = false;
  }

  // 42. Every park has coordinates with lat and lng
  const parksNoCoords = parksArr.filter(
    (p) => !p.coordinates || p.coordinates.lat == null || p.coordinates.lng == null
  );
  if (parksNoCoords.length === 0) {
    logPass('All parks have valid coordinates');
  } else {
    logFail(`${parksNoCoords.length} parks are missing coordinates`);
    parksNoCoords.forEach((p) => console.error(`  id=${p.id} name="${p.name}"`));
    ok = false;
  }

  // 43. Every park has a valid type
  const VALID_PARK_TYPES = [
    'National Park',
    'National Reserve',
    'Marine Park',
    'Marine Reserve',
    'Wildlife Sanctuary',
    'Marine Park & Reserve',
  ];
  const parksInvalidType = parksArr.filter((p) => !VALID_PARK_TYPES.includes(p.type));
  if (parksInvalidType.length === 0) {
    logPass('All parks have a valid type');
  } else {
    logFail(`${parksInvalidType.length} parks have an invalid type`);
    parksInvalidType.forEach((p) => console.error(`  id=${p.id} name="${p.name}" type="${p.type}"`));
    ok = false;
  }

  // 44. presidents array has exactly 5 entries
  if (presidentsArr.length === 5) {
    logPass('presidents.json contains exactly 5 presidents');
  } else {
    logFail(`expected 5 presidents, found ${presidentsArr.length}`);
    ok = false;
  }

  // 45. Exactly one incumbent president
  const incumbents = presidentsArr.filter((p) => p.is_incumbent === true);
  if (incumbents.length === 1) {
    logPass(`Exactly one incumbent president: ${incumbents[0].name}`);
  } else {
    logFail(`expected exactly 1 incumbent, found ${incumbents.length}`);
    ok = false;
  }

  // 46. Every president has a non-empty deputies array
  const missingDeputies = presidentsArr.filter((p) => !Array.isArray(p.deputies) || p.deputies.length === 0);
  if (missingDeputies.length === 0) {
    logPass('All presidents have a non-empty deputies array');
  } else {
    logFail(`${missingDeputies.length} presidents are missing deputies`);
    missingDeputies.forEach((p) => console.error(`  id=${p.id} name="${p.name}"`));
    ok = false;
  }

  // 47. order values are sequential 1 through 5
  const orders = presidentsArr.map((p) => p.order).sort((a, b) => a - b);
  const expectedOrders = [1, 2, 3, 4, 5];
  if (JSON.stringify(orders) === JSON.stringify(expectedOrders)) {
    logPass('Presidents have sequential order values 1–5');
  } else {
    logFail(`order values are not sequential 1–5: ${orders.join(', ')}`);
    ok = false;
  }

  // 48. parastatals.json has exactly 246 entries
  if (parastatalsArr.length === 246) {
    logPass('parastatals.json contains exactly 246 entries');
  } else {
    logFail(`expected 246 parastatals, found ${parastatalsArr.length}`);
    ok = false;
  }

  // 49. Every parastatal has a valid sector
  const VALID_SECTORS = [
    'Agriculture', 'Education & Research', 'Energy', 'Finance & Regulation',
    'Health', 'ICT & Innovation', 'Infrastructure & Transport', 'Justice & Governance',
    'Labour & Social Welfare', 'Land & Water', 'Media & Culture',
    'Security & Public Safety', 'Tourism & Wildlife', 'Trade & Industry',
    'Youth & Sports', 'Other',
  ];
  const invalidSector = parastatalsArr.filter((p) => !VALID_SECTORS.includes(p.sector));
  if (invalidSector.length === 0) {
    logPass('All parastatals have a valid sector');
  } else {
    logFail(`${invalidSector.length} parastatals have an invalid sector:`);
    invalidSector.forEach((p) => console.error(`  id=${p.id} name="${p.name}" sector="${p.sector}"`));
    ok = false;
  }

  // 50. No duplicate parastatal names
  const paraNames = parastatalsArr.map((p) => p.name);
  const dupParaNames = paraNames.filter((n, i) => paraNames.indexOf(n) !== i);
  if (dupParaNames.length === 0) {
    logPass('No duplicate parastatal names found');
  } else {
    logFail('Duplicate parastatal names: ' + Array.from(new Set(dupParaNames)).join(', '));
    ok = false;
  }

  // 51. Parastatal IDs are sequential 1–246
  const paraIds = parastatalsArr.map((p) => p.id);
  const expectedParaIds = Array.from({ length: 246 }, (_, i) => i + 1);
  if (JSON.stringify(paraIds) === JSON.stringify(expectedParaIds)) {
    logPass('Parastatal IDs are sequential 1–246');
  } else {
    logFail('Parastatal IDs are not sequential 1–246');
    ok = false;
  }

  if (ok) {
    console.log('\nALL CHECKS PASSED');
    process.exit(0);
  } else {
    console.error('\nVALIDATION FAILED');
    process.exit(2);
  }
}

run();
