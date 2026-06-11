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

  if (ok) {
    console.log('\nALL CHECKS PASSED');
    process.exit(0);
  } else {
    console.error('\nVALIDATION FAILED');
    process.exit(2);
  }
}

run();
