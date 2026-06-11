# KenyaAPI Documentation

## Base URL

`http://localhost:3000/api/v1`

## Overview

KenyaAPI exposes four main resource groups:

- `counties`
- `holidays`
- `population`
- `exchange-rates`

All responses are JSON and follow this general shape:

```json
{
  "success": true,
  "data": ...
}
```

Errors return:

```json
{
  "success": false,
  "error": "Message",
  "statusCode": 404
}
```

---

## Counties

### Get all counties

`GET /api/v1/counties`

Optional query parameters:

- `region`: filter counties by region, e.g. `Coast`
- `sort`: sort by `area_asc`, `area_desc`, `population_asc`, or `population_desc`

Response:

- `count`: total number of counties
- `data`: array of county records, each including `headquarters`, `area_km2`, `region`, and `population`

Example:

`GET /api/v1/counties?region=Coast&sort=population_desc`

### Get a single county

`GET /api/v1/counties/:id`

Response:

- `data`: county object with `headquarters`, `area_km2`, `region`, and `population`

Example:

`GET /api/v1/counties/1`

---

## Holidays

### Get all holidays

`GET /api/v1/holidays`

Optional query:

- `year`: filter holidays by year

Example:

`GET /api/v1/holidays?year=2025`

### Get a single holiday

`GET /api/v1/holidays/:id`

---

## Population

### Get population summary

`GET /api/v1/population`

Returns national population totals for the latest dataset.

### Get population by county

`GET /api/v1/population/counties`

Returns population breakdown for each county.

---

## Exchange Rates

### Get all exchange rates

`GET /api/v1/exchange-rates`

### Get a rate by currency

`GET /api/v1/exchange-rates/:currency`

Example:

`GET /api/v1/exchange-rates/USD`

---

## Web Pages

- Landing page: `GET /`
- HTML docs: `GET /docs`
