# Institutions

Educational institutions across Kenya including 53 universities (41 public + 12 private chartered) and 620+ TVET institutions. Data sourced from the Commission for University Education (CUE) and TVETA Kenya (2025).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/institutions` | All institutions (supports pagination and filters) |
| GET | `/api/v1/institutions/universities` | All 53 universities |
| GET | `/api/v1/institutions/tvets` | All TVET institutions |
| GET | `/api/v1/institutions/:id` | Single institution by ID |
| GET | `/api/v1/institutions/county/:county_id` | Institutions in a specific county |
| GET | `/api/v1/institutions/type/:type` | Institutions by type (University, TVET) |
| GET | `/api/v1/institutions/search?q=term` | Search by name, county, or address |

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `category` | string | Filter universities by category | `?category=Public` |
| `county_id` | number | Filter by county | `?county_id=47` |
| `subtype` | string | Filter TVETs by subtype | `?subtype=polytechnic` |
| `initials` | string | Lookup by institution initials | `?initials=UON` |
| `page` | number | Page number (default 1) | `?page=2` |
| `limit` | number | Results per page | `?limit=20` |

## Data Model

```json
{
  "id": 2,
  "name": "Kenya Medical Training College Mombasa Campus",
  "type": "TVET",
  "category": "Public",
  "address": "Mombasa-Malindi Road, Mombasa",
  "county_id": 1,
  "county_name": "Mombasa",
  "initials": null
}
```

University records include additional fields:

```json
{
  "id": 35,
  "name": "Alupe University",
  "type": "University",
  "category": "Public",
  "county_id": 40,
  "county_name": "Busia",
  "constituency": "",
  "address": "Busia Town, Busia",
  "postal_code": "",
  "phone": "",
  "email": "",
  "website": "https://www.alupe.ac.ke",
  "accredited_by": "Commission for University Education (CUE)",
  "source": "Commission for University Education (CUE)",
  "initials": "AU",
  "year_established": null,
  "coordinates": { "lat": null, "lng": null }
}
```

## Example Requests

```bash
# All institutions
curl https://kenya-api.netlify.app/api/v1/institutions

# All 53 universities
curl https://kenya-api.netlify.app/api/v1/institutions/universities

# Public universities only (41)
curl "https://kenya-api.netlify.app/api/v1/institutions/universities?category=Public"

# Private universities only (12)
curl "https://kenya-api.netlify.app/api/v1/institutions/universities?category=Private"

# All TVETs
curl https://kenya-api.netlify.app/api/v1/institutions/tvets

# National Polytechnics only
curl "https://kenya-api.netlify.app/api/v1/institutions/tvets?subtype=polytechnic"

# Lookup by initials
curl "https://kenya-api.netlify.app/api/v1/institutions?initials=UON"

# Institutions in Nairobi (county_id=47)
curl https://kenya-api.netlify.app/api/v1/institutions/county/47

# Search
curl "https://kenya-api.netlify.app/api/v1/institutions/search?q=nairobi"
```

## Institution Types

| Type | Subtype | Count |
|------|---------|-------|
| University | Public | 41 |
| University | Private | 12 |
| TVET | National Polytechnic | varies |
| TVET | Technical Training Institute | varies |
| TVET | Vocational Training Centre | varies |

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
