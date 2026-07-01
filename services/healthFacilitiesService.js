const KMHFR_BASE = 'https://api.kmhfr.health.go.ke/api/v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const KMHFR_TOKEN = process.env.KMHFR_API_TOKEN || null;

const cache = new Map();

const FACILITY_TYPES = [
  'Hospital', 'Health Centre', 'Dispensary',
  'Clinic', 'Laboratory', 'Pharmacy',
  'Nursing Home', 'Medical Centre',
  'VCT Centre', 'Radiology/Imaging',
  'Dental Clinic', 'Eye Clinic', 'Blood Bank',
  'Rehabilitation', 'Health Programme',
];

const KEPH_LEVELS = {
  '1': 'Community Health Unit',
  '2': 'Dispensary / Health Post',
  '3': 'Health Centre',
  '4': 'County / Sub-county Hospital',
  '5': 'County Referral Hospital',
  '6': 'National Referral Hospital',
};

const OWNER_CATEGORIES = ['Public', 'Private', 'Faith-Based', 'NGO'];

async function fetchFromKMHFR(path, params = {}) {
  if (!KMHFR_TOKEN) {
    const err = new Error('KMHFR_API_TOKEN environment variable is not set');
    err.code = 'NO_TOKEN';
    throw err;
  }

  const url = new URL(`${KMHFR_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, v);
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${KMHFR_TOKEN}`,
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`KMHFR API returned ${res.status} for ${url}`);
  }
  return res.json();
}

async function getFacilities(params = {}) {
  const cacheKey = JSON.stringify(params);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { ...cached.data, from_cache: true };
  }

  const data = await fetchFromKMHFR('/facilities/', { format: 'json', ...params });

  cache.set(cacheKey, { data, timestamp: Date.now() });
  return { ...data, from_cache: false };
}

async function getFacilityByCode(code) {
  const cacheKey = `facility:${code}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { ...cached.data, from_cache: true };
  }

  const data = await fetchFromKMHFR(`/facilities/${code}/`, { format: 'json' });

  cache.set(cacheKey, { data, timestamp: Date.now() });
  return { ...data, from_cache: false };
}

async function getCountySummary(countyId) {
  const cacheKey = `county_summary:${countyId}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { ...cached.data, from_cache: true };
  }

  const data = await fetchFromKMHFR('/facilities/', {
    format: 'json',
    county: countyId,
    page_size: 1,
  });

  const summary = {
    county_id: countyId,
    total_facilities: data.count || 0,
    from_cache: false,
  };

  cache.set(cacheKey, { data: summary, timestamp: Date.now() });
  return summary;
}

function getCacheStats() {
  return {
    entries: cache.size,
    ttl_hours: CACHE_TTL_MS / (60 * 60 * 1000),
  };
}

function clearCache() {
  cache.clear();
}

module.exports = {
  getFacilities,
  getFacilityByCode,
  getCountySummary,
  getCacheStats,
  clearCache,
  FACILITY_TYPES,
  KEPH_LEVELS,
  OWNER_CATEGORIES,
  KMHFR_BASE,
};
