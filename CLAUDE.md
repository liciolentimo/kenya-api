# KenyaAPI — Claude Code Project Guide

## Project Overview

**KenyaAPI** is a free, open REST API providing structured data about Kenya — counties, constituencies, public holidays, population statistics,currency/exchange rate information and more. It is built with Node.js and Express.

**Primary goal:** Make Kenyan public data accessible to developers in a clean, consistent JSON format.

---

## Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Runtime      | Node.js 18+             |
| Framework    | Express 4.x             |
| Data         | JSON flat files (`/data`) |
| Docs         | HTML page at `/docs`    |
| Testing      | Jest + Supertest        |
| Linting      | ESLint (Airbnb style)   |

---

## Project Structure

```
kenya-api/
├── CLAUDE.md               ← You are here
├── README.md
├── package.json
├── server.js               ← Entry point
├── app.js                  ← Express app (no listen call)
├── routes/
│   ├── counties.js
│   ├── constituencies.js
│   ├── holidays.js
│   ├── population.js
│   └── exchange-rates.js
├── controllers/
│   ├── countiesController.js
│   ├── constituenciesController.js
│   ├── holidaysController.js
│   ├── populationController.js
│   └── exchangeRatesController.js
├── data/
│   ├── counties.json
│   ├── constituencies.json
│   ├── holidays.json
│   ├── population.json
│   └── exchange-rates.json
├── middleware/
│   ├── errorHandler.js
│   └── notFound.js
├── public/
│   ├── index.html          ← Landing page
│   └── docs.html           ← API documentation page
└── tests/
    ├── counties.test.js
    └── holidays.test.js
```

---

## API Base URL

```
https://kenya-api.netlify.app/api/v1
```

---

## Routes & Endpoints

### Counties
| Method | Path                        | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/api/v1/counties`          | List all 47 counties               |
| GET    | `/api/v1/counties?governor_party=UDA` | Filter counties by governor party |
| GET    | `/api/v1/counties?q=coast`  | Full-text search across name and description |
| GET    | `/api/v1/counties/governors` | Lightweight directory of all 47 governors |
| GET    | `/api/v1/counties/:id`      | Single county by numeric ID        |
| GET    | `/api/v1/counties/:id/constituencies` | All constituencies in a county |

### Constituencies
| Method | Path                              | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/v1/constituencies`          | List all 290 constituencies     |
| GET    | `/api/v1/constituencies/:id`      | Single constituency by ID       |

### Public Holidays
| Method | Path                              | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/v1/holidays`                | All public holidays             |
| GET    | `/api/v1/holidays?year=2025`      | Holidays filtered by year       |
| GET    | `/api/v1/holidays/:id`            | Single holiday by ID            |

### Population
| Method | Path                              | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/v1/population`              | National population summary     |
| GET    | `/api/v1/population/counties`     | Population breakdown by county  |

### Exchange Rates
| Method | Path                              | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/v1/exchange-rates`          | KES rates for 25 currencies (CBK) |
| GET    | `/api/v1/exchange-rates/:currency`| KES rate for a specific currency |

### Educational Institutions
| Method | Path                                      | Description                                        |
|--------|-------------------------------------------|----------------------------------------------------|
| GET    | `/api/v1/institutions`                    | List institutions with optional pagination/filters |
| GET    | `/api/v1/institutions/:id`                | Single institution by ID                           |
| GET    | `/api/v1/institutions/county/:county_id`  | Institutions in a specific county                  |
| GET    | `/api/v1/institutions/type/:type`         | Institutions by type (University, TVET, etc.)      |
| GET    | `/api/v1/institutions/search?q=term`      | Search institutions by name, county, or address    |

---

## Response Format

All endpoints return consistent JSON:

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

## Data Models

### County
```json
{
  "id": 1,
  "name": "Mombasa",
  "code": "001",
  "headquarters": "Mombasa City",
  "region": "Coast",
  "area_km2": 212.5,
  "population": 1208333,
  "governor": "Abdullswamad Nassir",
  "governor_party": "ODM",
  "governor_since": 2022,
  "flag_url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Flag_of_Mombasa_County.svg",
  "description": "A coastal county along the Indian Ocean in southeastern Kenya, known for tourism, luxurious beach hotels, and the historic Mombasa Old Town."
}
```

Governor data sourced from 2022 Kenya General Election results.
County flags: Wikimedia Commons (CC BY-SA) — sourced from en.wikipedia.org/wiki/Flags_of_counties_of_Kenya
County descriptions: one-sentence factual summaries synthesised from official county information.

### Constituency
```json
{
  "id": 1,
  "name": "Changamwe",
  "county_id": 1,
  "county_name": "Mombasa",
  "mp_seats": 1
}
```

### Holiday
```json
{
  "id": 1,
  "name": "New Year's Day",
  "date": "2025-01-01",
  "day": "Wednesday",
  "type": "National"
}
```

### Population Entry
```json
{
  "county_id": 1,
  "county_name": "Mombasa",
  "population": 1208333
}
```

### Exchange Rate
```json
{
  "id": 1,
  "currency": "USD",
  "currency_name": "US Dollar",
  "buy": 128.50,
  "mean": 129.21,
  "sell": 129.92,
  "last_updated": "2026-04-23",
  "source": "Central Bank of Kenya"
}
```

### Educational Institution
```json
{
  "id": 1,
  "name": "Technical University of Mombasa",
  "type": "University",
  "category": "Public",
  "address": "Jomo Kenyatta Avenue, Mombasa",
  "county_id": 1,
  "county_name": "Mombasa"
}
```

---

## Coding Conventions

- Use `async/await` — no raw callbacks or `.then()` chains
- All route files use `express.Router()`
- Controllers handle business logic; routes only wire paths to controllers
- Always return `next(error)` rather than swallowing errors
- HTTP status codes: `200` success, `201` created, `400` bad request, `404` not found, `500` server error
- No magic numbers — export constants from a shared `config.js`

---

## Data Sources

- **Counties & Constituencies**: IEBC (2022 constituency boundaries) + KNBS Census 2019 population data
- **Population**: Kenya National Bureau of Statistics (2019 Census) — sourced April 2026
- **Exchange Rates**: Central Bank of Kenya (CBK) indicative rates — last seeded April 2026

---

## Current Task for Claude Code

> **Build the initial Express app with all five route groups wired up, controllers reading from JSON data files, a global error handler, and a 404 middleware. Also serve `public/index.html` as the root (`/`) and `public/docs.html` at `/docs`.**

Start with:
1. `app.js` and `server.js`
2. `middleware/errorHandler.js` and `middleware/notFound.js`
3. `routes/counties.js` + `controllers/countiesController.js`
4. Seed data file `data/counties.json` with all 47 Kenyan counties
5. Repeat pattern for the remaining four route groups

Write a Jest test for the `/api/v1/counties` endpoint before moving to the next route group.
