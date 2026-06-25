# Parastatals & State Corporations

Kenya's 246 state corporations and parastatals established under the State Corporations Act, Cap 446, or by Acts of Parliament. Covers 16 sectors including Energy, Health, Agriculture, Infrastructure, Education, and more.

> **Note:** Universities listed here (flagged with `is_university: true`) are also fully documented with contact details, county location, and accreditation in the [Institutions](Institutions) endpoint.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/parastatals` | All 246 state corporations (paginated, filterable) |
| GET | `/api/v1/parastatals/:id` | Single parastatal by ID (1–246) |
| GET | `/api/v1/parastatals/sector/:sector` | All parastatals in a given sector |
| GET | `/api/v1/parastatals/sectors` | Sector breakdown with entity counts |
| GET | `/api/v1/parastatals/search?q=` | Search by name or abbreviation |

## Query Parameters (GET /parastatals)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `sector` | string | Filter by sector | `?sector=Health` |
| `is_university` | boolean | Include or exclude university entries | `?is_university=false` |
| `q` | string | Search by name or abbreviation | `?q=KRA` |
| `page` | integer | Page number (default 1) | `?page=2` |
| `limit` | integer | Results per page (default 50) | `?limit=25` |

## Sectors

| Sector | Count |
|--------|-------|
| Education & Research | 65 |
| Agriculture | 30 |
| Land & Water | 23 |
| Trade & Industry | 20 |
| Infrastructure & Transport | 17 |
| Finance & Regulation | 15 |
| Health | 13 |
| Justice & Governance | 13 |
| Media & Culture | 10 |
| Energy | 9 |
| Youth & Sports | 7 |
| ICT & Innovation | 7 |
| Labour & Social Welfare | 7 |
| Tourism & Wildlife | 6 |
| Security & Public Safety | 4 |

## Data Model

```json
{
  "id": 107,
  "name": "Kenya Power and Lighting Company Ltd",
  "abbreviation": "KPLC",
  "sector": "Energy",
  "category": "State Corporation",
  "established_by": "State Corporations Act, Cap 446",
  "is_university": false,
  "website": "",
  "source": "https://majira.co.ke/list-of-all-parastatals-state-corporations-in-kenya/"
}
```

## Example Requests

```bash
# All parastatals (paginated, 50 per page)
curl https://kenya-api.netlify.app/api/v1/parastatals

# Filter by sector
curl "https://kenya-api.netlify.app/api/v1/parastatals?sector=Health"

# Exclude university entries
curl "https://kenya-api.netlify.app/api/v1/parastatals?is_university=false"

# Paginate
curl "https://kenya-api.netlify.app/api/v1/parastatals?page=2&limit=25"

# Single parastatal (KPLC)
curl https://kenya-api.netlify.app/api/v1/parastatals/107

# All parastatals in a sector
curl "https://kenya-api.netlify.app/api/v1/parastatals/sector/Health"

# Sector breakdown
curl https://kenya-api.netlify.app/api/v1/parastatals/sectors

# Search by abbreviation
curl "https://kenya-api.netlify.app/api/v1/parastatals/search?q=KRA"
```

## Example Response — All Parastatals

```json
{
  "success": true,
  "total": 246,
  "count": 50,
  "page": 1,
  "totalPages": 5,
  "established_under": "State Corporations Act, Cap 446",
  "data": [
    {
      "id": 1,
      "name": "Agricultural Development Corporation",
      "abbreviation": null,
      "sector": "Agriculture",
      "category": "State Corporation",
      "established_by": "State Corporations Act, Cap 446",
      "is_university": false,
      "website": "",
      "source": "https://majira.co.ke/list-of-all-parastatals-state-corporations-in-kenya/"
    }
  ]
}
```

## Example Response — Sectors Breakdown

```json
{
  "success": true,
  "count": 15,
  "data": [
    { "sector": "Education & Research", "count": 65 },
    { "sector": "Agriculture", "count": 30 },
    { "sector": "Land & Water", "count": 23 }
  ]
}
```

## University Cross-Reference

36 of the 246 entries are universities (`is_university: true`). These appear in both the parastatals list (as state corporations) and in the [Institutions](Institutions) endpoint (with full academic details including county, contact info, and accreditation).

To get only non-university parastatals:
```bash
curl "https://kenya-api.netlify.app/api/v1/parastatals?is_university=false"
# total: 210
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
