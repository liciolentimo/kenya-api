# KenyaAPI

KenyaAPI is a lightweight Node.js and Express REST API providing structured data about Kenya.

## Features

- Landing webpage with API overview
- Public documentation page in HTML
- Markdown API documentation in `API_DOCS.md`
- Routes for counties, public holidays, population, and exchange rates
- Error handling with consistent JSON responses

## Installation

```bash
npm install
```

## Running the API

```bash
npm start
```

The API is live at `https://kenya-api.netlify.app`.

## Endpoints

- `GET /api/v1/counties`
- `GET /api/v1/counties/:id`
- `GET /api/v1/holidays`
- `GET /api/v1/holidays/:id`
- `GET /api/v1/population`
- `GET /api/v1/population/counties`
- `GET /api/v1/exchange-rates`
- `GET /api/v1/exchange-rates/:currency`

## Documentation

- HTML docs: `https://kenya-api.netlify.app/docs`
- Markdown docs: `API_DOCS.md`
