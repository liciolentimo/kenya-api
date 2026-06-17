const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

let cachedRates = null;
let lastFetchedAt = null;

const CURRENCY_NAMES = {
  USD: 'US Dollar',
  GBP: 'British Pound',
  EUR: 'Euro',
  JPY: 'Japanese Yen',
  ZAR: 'South African Rand',
  AED: 'UAE Dirham',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  SAR: 'Saudi Riyal',
  QAR: 'Qatari Riyal',
  HKD: 'Hong Kong Dollar',
  SGD: 'Singapore Dollar',
  UGX: 'Ugandan Shilling',
  TZS: 'Tanzanian Shilling',
  RWF: 'Rwandan Franc',
  ETB: 'Ethiopian Birr',
  NGN: 'Nigerian Naira',
  ZMW: 'Zambian Kwacha',
  MUR: 'Mauritian Rupee',
};

async function fetchLiveRates() {
  const now = Date.now();

  if (cachedRates && lastFetchedAt && now - lastFetchedAt < CACHE_TTL_MS) {
    return cachedRates;
  }

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/KES');
    if (!res.ok) {
      throw new Error(`Provider returned ${res.status}`);
    }
    const json = await res.json();

    if (json.result !== 'success') {
      throw new Error('Provider returned non-success result');
    }

    // json.rates are KES→currency; invert to get currency→KES
    const wanted = Object.keys(CURRENCY_NAMES);
    const data = wanted
      .filter((code) => json.rates[code])
      .map((code, i) => {
        const kesPerUnit = 1 / json.rates[code];
        const spread = kesPerUnit * 0.003;
        return {
          id: i + 1,
          currency: code,
          currency_name: CURRENCY_NAMES[code],
          buy: Number((kesPerUnit - spread).toFixed(4)),
          mean: Number(kesPerUnit.toFixed(4)),
          sell: Number((kesPerUnit + spread).toFixed(4)),
        };
      });

    cachedRates = {
      base_currency: 'KES',
      last_updated: json.time_last_update_utc,
      next_update: json.time_next_update_utc,
      source: 'open.er-api.com (live mid-market rates)',
      data,
    };
    lastFetchedAt = now;

    return cachedRates;
  } catch (err) {
    console.error('Exchange rate fetch failed:', err.message);

    if (cachedRates) {
      return {
        ...cachedRates,
        stale: true,
        warning: 'Live rates temporarily unavailable — showing last cached rates',
      };
    }

    throw err;
  }
}

module.exports = { fetchLiveRates };
