# Wards

Kenya has 1,450 electoral wards. The API covers 1,263 wards across 45 counties, sourced from the IEBC via an open CC0 dataset. Nairobi, Kericho, and Bomet are absent from the upstream source.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/wards` | All wards (paginated, default 50/page) |
| GET | `/api/v1/wards/county/:county_id` | Wards grouped by sub-county for a county |
| GET | `/api/v1/wards/sub-county?name=` | Wards in a specific sub-county |
| GET | `/api/v1/wards/sub-counties/:county_id` | Sub-counties list for a county |
| GET | `/api/v1/wards/search?q=` | Search wards by name, sub-county, or county |

## Query Parameters (GET /wards)

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `county_id` | number | Filter by county | — |
| `sub_county` | string | Filter by sub-county name | — |
| `page` | number | Page number | 1 |
| `limit` | number | Results per page | 50 |

## Data Model

```json
{
  "id": 1,
  "sub_county_id": 1,
  "sub_county_name": "Changamwe",
  "county_id": 1,
  "county_name": "Mombasa",
  "ward": "Port Reitz"
}
```

## Example Requests

```bash
# All wards (paginated)
curl https://kenya-api.netlify.app/api/v1/wards

# Wards in Mombasa, grouped by sub-county
curl https://kenya-api.netlify.app/api/v1/wards/county/1

# Wards in a specific sub-county
curl "https://kenya-api.netlify.app/api/v1/wards/sub-county?name=Changamwe"

# Sub-counties list for Mombasa
curl https://kenya-api.netlify.app/api/v1/wards/sub-counties/1

# Search wards
curl "https://kenya-api.netlify.app/api/v1/wards/search?q=port"
```

## Example Response

```json
{
  "success": true,
  "count": 5,
  "data": [
    { "id": 1, "sub_county_id": 1, "sub_county_name": "Changamwe", "county_id": 1, "county_name": "Mombasa", "ward": "Port Reitz" },
    { "id": 2, "sub_county_id": 1, "sub_county_name": "Changamwe", "county_id": 1, "county_name": "Mombasa", "ward": "Kipevu" }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
