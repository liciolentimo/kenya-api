# Exchange Rates

Live KES (Kenyan Shilling) exchange rates for 25 major currencies. Rates are fetched from [open.er-api.com](https://open.er-api.com) — a free, no-key-required provider — and cached server-side for 1 hour. These are **live mid-market rates**, not static CBK indicative rates.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/exchange-rates` | All 25 currency rates against KES |
| GET | `/api/v1/exchange-rates/:currency` | Rate for a specific currency (e.g. `USD`) |

## Data Model

```json
{
  "id": 1,
  "currency": "USD",
  "currency_name": "US Dollar",
  "buy": 128.50,
  "mean": 129.21,
  "sell": 129.92,
  "last_updated": "2026-04-23",
  "source": "open.er-api.com"
}
```

## Supported Currencies

USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NOK, DKK, NZD, SGD, HKD, INR, ZAR, BRL, MXN, EGP, AED, SAR, QAR, KWD, TZS, UGX

## Example Requests

```bash
# All exchange rates
curl https://kenya-api.netlify.app/api/v1/exchange-rates

# KES/USD rate
curl https://kenya-api.netlify.app/api/v1/exchange-rates/USD

# KES/GBP rate
curl https://kenya-api.netlify.app/api/v1/exchange-rates/GBP
```

## Example Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "currency": "USD",
      "currency_name": "US Dollar",
      "buy": 128.50,
      "mean": 129.21,
      "sell": 129.92,
      "last_updated": "2026-06-25",
      "source": "open.er-api.com"
    }
  ]
}
```

## Caching & Freshness

- Rates are fetched live on first request after server start
- Results are cached in memory for **1 hour**
- On provider failure, the server returns the last known good rates with a warning
- Cache resets on server restart

> Note: These are mid-market rates from a public aggregator, not the official CBK indicative rates published at [centralbank.go.ke](https://www.centralbank.go.ke).

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
