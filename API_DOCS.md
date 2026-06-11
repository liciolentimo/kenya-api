# KenyaAPI Documentation

## Base URL

```
https://kenya-api.netlify.app/api/v1
```

## Overview

KenyaAPI provides structured public data about Kenya across six resource groups:

- `counties`
- `constituencies`
- `holidays`
- `population`
- `exchange-rates`
- `institutions`

No authentication or API key is required. All endpoints return JSON.

### Success response

```json
{
  "success": true,
  "count": 47,
  "data": [ ... ]
}
```

### Error response

```json
{
  "success": false,
  "error": "County with ID 99 not found",
  "statusCode": 404
}
```

### HTTP status codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request (invalid param) |
| 404 | Resource not found |
| 500 | Server error |

---

## Counties

### Get all counties

`GET /api/v1/counties`

**Query parameters:**

| Name | Type | Description |
|------|------|-------------|
| region | string | Filter by region, e.g. `Coast`, `Rift Valley` |
| sort | string | Sort order: `area_asc`, `area_desc`, `population_asc`, `population_desc` |

**Example:**

```
GET /api/v1/counties?region=Coast&sort=population_desc
```

**Response fields:** `id`, `code`, `name`, `headquarters`, `region`, `area_km2`, `population`

---

### Get a single county

`GET /api/v1/counties/:id`

**Path parameter:** `id` — county ID from 1 to 47.

**Example:**

```
GET /api/v1/counties/1
```

---

### Get constituencies in a county

`GET /api/v1/counties/:id/constituencies`

Returns all constituencies belonging to the given county.

**Example:**

```
GET /api/v1/counties/1/constituencies
```

---

## Constituencies

### Get all constituencies

`GET /api/v1/constituencies`

Returns all 290 constituencies.

**Response fields:** `id`, `code`, `name`, `county_id`, `county_name`

---

### Get a single constituency

`GET /api/v1/constituencies/:id`

**Path parameter:** `id` — constituency ID from 1 to 290.

**Example:**

```
GET /api/v1/constituencies/1
```

---

## Public Holidays

### Get all holidays

`GET /api/v1/holidays`

**Query parameters:**

| Name | Type | Description |
|------|------|-------------|
| year | integer | Filter by year, e.g. `2025` |

**Example:**

```
GET /api/v1/holidays?year=2025
```

**Response fields:** `id`, `name`, `date`, `day`, `type`

---

### Get a single holiday

`GET /api/v1/holidays/:id`

**Example:**

```
GET /api/v1/holidays/1
```

---

## Population

### Get national population summary

`GET /api/v1/population`

Returns national totals from the 2019 Kenya National Bureau of Statistics census, including the most and least populous counties.

---

### Get population by county

`GET /api/v1/population/counties`

Returns population figures for each of the 47 counties.

**Response fields per record:** `county_id`, `county_name`, `population`

---

## Exchange Rates

Rates are indicative KES values sourced from the Central Bank of Kenya. Data was last seeded April 2026.

### Get all exchange rates

`GET /api/v1/exchange-rates`

Returns buy, mean, and sell rates for 25 currencies.

**Response fields:** `id`, `currency`, `currency_name`, `buy`, `mean`, `sell`, `last_updated`, `source`

**Available currency codes:** USD, GBP, EUR, JPY, ZAR, AED, CAD, AUD, CHF, CNY, INR, SEK, NOK, DKK, SAR, QAR, HKD, SGD, UGX, TZS, RWF, ETB, NGN, ZMW, MUR

---

### Get rate for a specific currency

`GET /api/v1/exchange-rates/:currency`

**Path parameter:** `currency` — ISO 4217 code (case-insensitive), e.g. `USD`.

**Example:**

```
GET /api/v1/exchange-rates/USD
```

**Example response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "currency": "USD",
    "currency_name": "US Dollar",
    "buy": 128.50,
    "mean": 129.21,
    "sell": 129.92,
    "last_updated": "2026-04-23",
    "source": "Central Bank of Kenya"
  }
}
```

---

## Educational Institutions

Data covers institutions in the first 10 Kenyan counties.

### Get all institutions

`GET /api/v1/institutions`

**Query parameters:**

| Name | Type | Description |
|------|------|-------------|
| page | integer | Page number for pagination |
| limit | integer | Items per page |
| type | string | Filter by type: `University`, `TVET`, `Secondary School`, `Primary School`, `College` |
| category | string | Filter by category: `Public`, `Private`, `Faith-Based`, `Technical` |

---

### Get a single institution

`GET /api/v1/institutions/:id`

**Example:**

```
GET /api/v1/institutions/1
```

---

### Get institutions by county

`GET /api/v1/institutions/county/:county_id`

**Example:**

```
GET /api/v1/institutions/county/1
```

---

### Get institutions by type

`GET /api/v1/institutions/type/:type`

**Example:**

```
GET /api/v1/institutions/type/University
```

---

### Search institutions

`GET /api/v1/institutions/search?q=:term`

Searches by name, address, county, or constituency. Minimum 2 characters.

**Example:**

```
GET /api/v1/institutions/search?q=Mombasa
```

**Response fields:** `id`, `name`, `type`, `category`, `address`, `county_id`, `county_name`

---

## Web Pages

| Path | Description |
|------|-------------|
| `GET /` | Landing page |
| `GET /docs` | Interactive HTML documentation |
