# KenyaAPI

A free, open REST API providing structured public data about Kenya — counties, constituencies, public holidays, population statistics, exchange rates, and educational institutions. Built with Node.js and Express.

**Live site:** https://kenya-api.netlify.app  
**API base URL:** https://kenya-api.netlify.app/api/v1  
**Docs:** https://kenya-api.netlify.app/docs

No API key or authentication required.

---

## Features

- 47 counties with headquarters, region, area, and population data
- 290 constituencies mapped to their counties
- National public holidays with optional year filtering
- National and per-county population figures (KNBS 2019 Census)
- KES exchange rates for 25 currencies sourced from the Central Bank of Kenya
- Educational institutions across the first 10 counties, searchable and filterable
- Interactive map explorer on the homepage — hover over any county to see live stats
- Consistent JSON responses with predictable error shapes
- Deployed as a Netlify serverless function — no server to manage

---

## Endpoints

### Counties
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/counties` | All 47 counties |
| GET | `/api/v1/counties/:id` | Single county by ID |
| GET | `/api/v1/counties/:id/constituencies` | All constituencies in a county |

### Constituencies
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/constituencies` | All 290 constituencies |
| GET | `/api/v1/constituencies/:id` | Single constituency by ID |

### Public Holidays
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/holidays` | All public holidays |
| GET | `/api/v1/holidays?year=2025` | Holidays filtered by year |
| GET | `/api/v1/holidays/:id` | Single holiday by ID |

### Population
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/population` | National population summary |
| GET | `/api/v1/population/counties` | Population breakdown by county |

### Exchange Rates
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/exchange-rates` | KES rates for 25 currencies |
| GET | `/api/v1/exchange-rates/:currency` | Rate for a specific currency (e.g. `USD`) |

### Educational Institutions
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/institutions` | All institutions (supports pagination and filters) |
| GET | `/api/v1/institutions/universities` | All universities (filter by `?category`, `?county_id`) |
| GET | `/api/v1/institutions?initials=UON` | Lookup institution by initials |
| GET | `/api/v1/institutions/:id` | Single institution by ID |
| GET | `/api/v1/institutions/county/:county_id` | Institutions in a specific county |
| GET | `/api/v1/institutions/type/:type` | Institutions by type |
| GET | `/api/v1/institutions/search?q=term` | Search by name, county, or address |

> University data covers all 41 public universities accredited by the Commission for University Education (CUE) as of 2025. Each entry includes the official initials, county location, and website.

### Ministries
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/ministries` | All 22 ministries and Cabinet Secretaries |
| GET | `/api/v1/ministries/:id` | Single ministry by ID |
| GET | `/api/v1/ministries/search?q=` | Search by ministry or CS name |

### Search
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/search?q=` | Search across all resources |
| GET | `/api/v1/search?q=&type=` | Search within a specific resource |

---

## Global Search

KenyaAPI supports cross-resource search through a single endpoint. Query all six resources simultaneously or narrow by type:

```bash
# Search everything
curl https://kenya-api.netlify.app/api/v1/search?q=nairobi

# Search only ministries
curl "https://kenya-api.netlify.app/api/v1/search?q=health&type=ministries"

# Search exchange rates
curl "https://kenya-api.netlify.app/api/v1/search?q=USD&type=exchange_rates"
```

---

## Response format

All endpoints return a consistent JSON shape:

```json
{
  "success": true,
  "count": 47,
  "data": [ ... ]
}
```

Errors follow this shape:

```json
{
  "success": false,
  "error": "County with ID 99 not found",
  "statusCode": 404
}
```

---

## Quick start

```bash
# Fetch all counties
curl https://kenya-api.netlify.app/api/v1/counties

# Fetch a single county
curl https://kenya-api.netlify.app/api/v1/counties/1

# Fetch constituencies in Mombasa
curl https://kenya-api.netlify.app/api/v1/counties/1/constituencies

# Filter Coast region counties, sorted by population
curl "https://kenya-api.netlify.app/api/v1/counties?region=Coast&sort=population_desc"

# Get the KES/USD exchange rate
curl https://kenya-api.netlify.app/api/v1/exchange-rates/USD

# Get holidays for 2025
curl "https://kenya-api.netlify.app/api/v1/holidays?year=2025"
```

---

## Running locally

```bash
git clone https://github.com/liciolentimo/kenya-api.git
cd kenya-api
npm install
npm start
```

The server starts on `http://localhost:3000`. All endpoints are available at `http://localhost:3000/api/v1`.

For development with auto-restart:

```bash
npm run dev
```

---

## Project structure

```
kenya-api/
├── app.js                  # Express app
├── server.js               # Entry point
├── netlify.toml            # Netlify build and redirect config
├── netlify/functions/
│   └── api.js              # Serverless function wrapper
├── routes/                 # Route definitions
├── controllers/            # Business logic
├── data/                   # JSON data files
├── middleware/             # Error handler, 404 handler
├── public/                 # Static frontend (served by Netlify)
│   ├── index.html
│   ├── docs.html
│   └── data/               # Bundled map data for the county explorer
└── tests/
```

---

## Data sources

| Dataset | Source |
|---------|--------|
| Counties & constituencies | IEBC (2022 constituency boundaries) |
| Population | Kenya National Bureau of Statistics — 2019 Census |
| Exchange rates | Central Bank of Kenya — indicative rates, seeded April 2026 |
| Institutions | Curated from public records, first 10 counties |
| Kenya Cabinet | Office of the President (president.go.ke) — 2024 |

> Cabinet data reflects appointments as of 2024 following the broad-based government formation by President William Ruto. Images are sourced from the official presidential website.

---

## Tech stack

- **Runtime:** Node.js 18+
- **Framework:** Express 4
- **Data:** JSON flat files
- **Hosting:** Netlify (static frontend + serverless functions)
- **Testing:** Jest + Supertest

---

## License

MIT
