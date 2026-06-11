/**
 * Replaces all University entries in data/institutions.json with the
 * canonical 41 public universities, adds initials:null to non-university
 * entries, and writes the result back.
 */

const fs = require('fs');
const path = require('path');

const institutionsPath = path.join(__dirname, '..', 'data', 'institutions.json');
const existing = JSON.parse(fs.readFileSync(institutionsPath, 'utf8'));

// ── 1. Keep only non-university entries; add initials: null to each ──────────
const nonUnis = existing
  .filter((i) => i.type !== 'University')
  .map((i) => ({ ...i, initials: null }));

// ── 2. Canonical 41 public universities ─────────────────────────────────────
const ACCREDITOR = 'Commission for University Education (CUE)';
const SOURCE = 'Commission for University Education (CUE)';

const uniData = [
  { name: 'Alupe University',                                         initials: 'AU',      county_name: 'Busia',          county_id: 40, website: 'https://www.alupe.ac.ke',              address: 'Busia Town, Busia' },
  { name: 'Bomet University College',                                  initials: 'BUC',     county_name: 'Bomet',          county_id: 36, website: 'https://www.buc.ac.ke',                address: 'Bomet Town, Bomet' },
  { name: 'Chuka University',                                          initials: 'CU',      county_name: 'Tharaka-Nithi',  county_id: 13, website: 'https://www.chuka.ac.ke',              address: 'Chuka Town, Tharaka-Nithi' },
  { name: 'Co-operative University of Kenya',                          initials: 'COPUK',   county_name: 'Nairobi',        county_id: 47, website: 'https://www.cuk.ac.ke',                address: 'Karen, Nairobi' },
  { name: 'Dedan Kimathi University of Technology',                    initials: 'DKUT',    county_name: 'Nyeri',          county_id: 19, website: 'https://www.dkut.ac.ke',               address: 'Nyeri-Mweiga Road, Nyeri' },
  { name: 'Egerton University',                                        initials: 'EU',      county_name: 'Nakuru',         county_id: 32, website: 'https://www.egerton.ac.ke',             address: 'Njoro, Nakuru' },
  { name: 'Garissa University',                                        initials: 'GU',      county_name: 'Garissa',        county_id: 7,  website: 'https://www.garissauniversity.ac.ke',   address: 'University Road, Garissa' },
  { name: 'Jaramogi Oginga Odinga University of Science and Technology', initials: 'JOOUST', county_name: 'Siaya',         county_id: 41, website: 'https://www.jooust.ac.ke',              address: 'Bondo, Siaya' },
  { name: 'Jomo Kenyatta University of Agriculture and Technology',    initials: 'JKUAT',   county_name: 'Kiambu',         county_id: 22, website: 'https://www.jkuat.ac.ke',               address: 'Juja, Kiambu' },
  { name: 'Kaimosi Friends University',                                initials: 'KAFU',    county_name: 'Vihiga',         county_id: 38, website: 'https://www.kafu.ac.ke',                address: 'Kaimosi, Vihiga' },
  { name: 'Karatina University',                                       initials: 'KARU',    county_name: 'Nyeri',          county_id: 19, website: 'https://www.karatinauniversity.ac.ke',  address: 'Karatina Town, Nyeri' },
  { name: 'Kenyatta University',                                       initials: 'KU',      county_name: 'Nairobi',        county_id: 47, website: 'https://www.ku.ac.ke',                  address: 'Thika Road, Nairobi' },
  { name: 'Kenyatta University Mama Ngina University College',         initials: 'MNUC',    county_name: 'Kiambu',         county_id: 22, website: 'https://www.ku.ac.ke',                  address: 'Thika Road, Kiambu' },
  { name: 'Kibabii University',                                        initials: 'KBBU',    county_name: 'Bungoma',        county_id: 39, website: 'https://www.kibabii.ac.ke',             address: 'Bungoma Town, Bungoma' },
  { name: 'Kirinyaga University',                                      initials: 'KYU',     county_name: 'Kirinyaga',      county_id: 20, website: 'https://www.kyu.ac.ke',                 address: 'Kutus, Kirinyaga' },
  { name: 'Kisii University',                                          initials: 'KSU',     county_name: 'Kisii',          county_id: 45, website: 'https://www.kisiiuniversity.ac.ke',     address: 'Kisii Town, Kisii' },
  { name: 'Koitaleel Samoei University College',                       initials: 'KSUC',    county_name: 'Nandi',          county_id: 29, website: 'https://www.ksuc.ac.ke',                address: 'Nandi Hills, Nandi' },
  { name: 'Laikipia University',                                       initials: 'LU',      county_name: 'Laikipia',       county_id: 31, website: 'https://www.laikipia.ac.ke',            address: 'Nyahururu, Laikipia' },
  { name: 'Maasai Mara University',                                    initials: 'MMARAU',  county_name: 'Narok',          county_id: 33, website: 'https://www.mmarau.ac.ke',              address: 'Narok Town, Narok' },
  { name: 'Machakos University',                                       initials: 'MCKU',    county_name: 'Machakos',       county_id: 16, website: 'https://www.mksu.ac.ke',                address: 'Machakos Town, Machakos' },
  { name: 'Maseno University',                                         initials: 'MSU',     county_name: 'Kisumu',         county_id: 42, website: 'https://www.maseno.ac.ke',              address: 'Maseno, Kisumu' },
  { name: 'Masinde Muliro University of Science and Technology',       initials: 'MMUST',   county_name: 'Kakamega',       county_id: 37, website: 'https://www.mmust.ac.ke',               address: 'Kakamega Town, Kakamega' },
  { name: 'Meru University of Science and Technology',                 initials: 'MUST',    county_name: 'Meru',           county_id: 12, website: 'https://www.must.ac.ke',                address: 'Meru Town, Meru' },
  { name: 'Moi University',                                            initials: 'MU',      county_name: 'Uasin Gishu',    county_id: 27, website: 'https://www.mu.ac.ke',                  address: 'Eldoret, Uasin Gishu' },
  { name: 'Multimedia University of Kenya',                            initials: 'MMU',     county_name: 'Nairobi',        county_id: 47, website: 'https://www.mmu.ac.ke',                 address: 'Magadi Road, Nairobi' },
  { name: "Murang'a University of Technology",                         initials: 'MUT',     county_name: "Murang'a",       county_id: 21, website: 'https://www.mut.ac.ke',                 address: "Murang'a Town, Murang'a" },
  { name: 'Nyandarua University College',                              initials: 'NUC',     county_name: 'Nyandarua',      county_id: 18, website: 'https://www.nuc.ac.ke',                 address: 'Ol Kalou, Nyandarua' },
  { name: 'Open University of Kenya',                                  initials: 'OUK',     county_name: 'Machakos',       county_id: 16, website: 'https://www.ouk.ac.ke',                 address: 'Athi River, Machakos' },
  { name: 'Pwani University',                                          initials: 'PU',      county_name: 'Kilifi',         county_id: 3,  website: 'https://www.pu.ac.ke',                   address: 'Kilifi Town, Kilifi' },
  { name: 'Rongo University',                                          initials: 'RNU',     county_name: 'Migori',         county_id: 44, website: 'https://www.rongovarsity.ac.ke',        address: 'Rongo Town, Migori' },
  { name: 'South Eastern Kenya University',                            initials: 'SEKU',    county_name: 'Kitui',          county_id: 15, website: 'https://www.seku.ac.ke',                address: 'Kitui Town, Kitui' },
  { name: 'Taita Taveta University',                                   initials: 'TTU',     county_name: 'Taita Taveta',   county_id: 6,  website: 'https://www.ttu.ac.ke',                  address: 'Voi-Mwatate Road, Voi' },
  { name: 'Technical University of Kenya',                             initials: 'TUK',     county_name: 'Nairobi',        county_id: 47, website: 'https://www.tukenya.ac.ke',             address: 'Haile Selassie Avenue, Nairobi' },
  { name: 'Technical University of Mombasa',                          initials: 'TUM',     county_name: 'Mombasa',        county_id: 1,  website: 'https://www.tum.ac.ke',                  address: 'Jomo Kenyatta Avenue, Mombasa' },
  { name: 'Tharaka University',                                        initials: 'THRKU',   county_name: 'Tharaka-Nithi',  county_id: 13, website: 'https://www.tharaka.ac.ke',             address: 'Marimanti, Tharaka-Nithi' },
  { name: 'Tom Mboya University',                                      initials: 'TMU',     county_name: 'Homa Bay',       county_id: 43, website: 'https://www.tmu.ac.ke',                 address: 'Homabay Town, Homa Bay' },
  { name: 'Turkana University College',                                initials: 'TRUC',    county_name: 'Turkana',        county_id: 23, website: 'https://www.tuc.ac.ke',                  address: 'Lodwar, Turkana' },
  { name: 'University of Eldoret',                                     initials: 'UOE',     county_name: 'Uasin Gishu',    county_id: 27, website: 'https://www.uoeld.ac.ke',               address: 'Eldoret, Uasin Gishu' },
  { name: 'University of Embu',                                        initials: 'UOEM',    county_name: 'Embu',           county_id: 14, website: 'https://www.embuni.ac.ke',               address: 'Embu Town, Embu' },
  { name: 'University of Kabianga',                                    initials: 'UOK',     county_name: 'Kericho',        county_id: 35, website: 'https://www.kabianga.ac.ke',             address: 'Kabianga, Kericho' },
  { name: 'University of Nairobi',                                     initials: 'UON',     county_name: 'Nairobi',        county_id: 47, website: 'https://www.uonbi.ac.ke',                address: 'University Way, Nairobi' },
];

const nextId = Math.max(...nonUnis.map((i) => i.id)) + 1;

const universities = uniData.map((u, idx) => ({
  id: nextId + idx,
  name: u.name,
  type: 'University',
  category: 'Public',
  county_id: u.county_id,
  county_name: u.county_name,
  constituency: '',
  address: u.address,
  postal_code: '',
  phone: '',
  email: '',
  website: u.website,
  accredited_by: ACCREDITOR,
  source: SOURCE,
  initials: u.initials,
  year_established: null,
  coordinates: { lat: null, lng: null },
}));

// ── 3. Merge: non-universities first, then universities sorted by name ────────
const merged = [...nonUnis, ...universities];

fs.writeFileSync(institutionsPath, JSON.stringify(merged, null, 2), 'utf8');

console.log(`Written: ${merged.length} total entries`);
console.log(`  Non-university: ${nonUnis.length}`);
console.log(`  Universities: ${universities.length}`);
console.log(`  First university ID: ${nextId}`);
console.log(`  Last university ID: ${nextId + universities.length - 1}`);
