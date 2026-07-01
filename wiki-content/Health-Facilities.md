# Health Facilities

Kenya's 17,521+ registered health facilities, sourced live from the Kenya Master Health Facility Registry (KMHFR), maintained by the Ministry of Health.

## Overview

| Detail | Value |
|--------|-------|
| Total facilities | 17,521+ |
| Data source | KMHFR — Ministry of Health |
| Source URL | https://kmhfr.health.go.ke |
| Cache TTL | 24 hours (server-side, per query) |
| Pagination | Yes — `?page=` and `?page_size=` |
| Auth required | KMHFR API token (set via `KMHFR_API_TOKEN` env var) |

## KEPH Levels

Kenya's health system is organised into 6 KEPH (Kenya Essential Package for Health) levels:

| Level | Description |
|-------|-------------|
| 1 | Community Health Unit |
| 2 | Dispensary / Health Post |
| 3 | Health Centre |
| 4 | County / Sub-county Hospital |
| 5 | County Referral Hospital |
| 6 | National Referral Hospital |

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health-facilities` | All facilities (paginated, filterable) |
| GET | `/api/v1/health-facilities/:code` | Single facility by KMHFR code |
| GET | `/api/v1/health-facilities/county/:id` | Facilities in a county |
| GET | `/api/v1/health-facilities/search?q=` | Search by name |
| GET | `/api/v1/health-facilities/types` | Facility type reference list |
| GET | `/api/v1/health-facilities/keph-levels` | KEPH level definitions |

## Query Parameters (GET /health-facilities)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | integer | no | Page number (default: 1) |
| `page_size` | integer | no | Results per page, max 100 (default: 30) |
| `county` | string | no | County name, e.g. `Nairobi` |
| `facility_type` | string | no | `Hospital`, `Dispensary`, `Clinic`, etc. |
| `keph_level` | integer | no | KEPH level 1–6 |
| `owner_category` | string | no | `Public`, `Private`, `Faith-Based`, `NGO` |
| `operation_status` | string | no | `Operational`, `Non-Operational` |
| `open_24hrs` | boolean | no | `true` = 24-hour facilities only |
| `has_beds` | boolean | no | `true` = inpatient facilities only |

## Example Requests

```bash
# All facilities (first page)
curl https://kenya-api.netlify.app/api/v1/health-facilities

# Nairobi hospitals only
curl "https://kenya-api.netlify.app/api/v1/health-facilities?county=Nairobi&facility_type=Hospital"

# 24-hour facilities in Mombasa
curl "https://kenya-api.netlify.app/api/v1/health-facilities?county=Mombasa&open_24hrs=true"

# Inpatient facilities (has beds) in Nakuru
curl "https://kenya-api.netlify.app/api/v1/health-facilities?county=Nakuru&has_beds=true"

# By county ID (47 = Nairobi)
curl https://kenya-api.netlify.app/api/v1/health-facilities/county/47

# Single facility by code
curl https://kenya-api.netlify.app/api/v1/health-facilities/14766

# Search by name
curl "https://kenya-api.netlify.app/api/v1/health-facilities/search?q=Kenyatta"

# Public Level 6 hospitals (national referral)
curl "https://kenya-api.netlify.app/api/v1/health-facilities?keph_level=6&owner_category=Public"

# Static reference: KEPH levels
curl https://kenya-api.netlify.app/api/v1/health-facilities/keph-levels

# Static reference: facility types
curl https://kenya-api.netlify.app/api/v1/health-facilities/types
```

## Example Response

```json
{
  "success": true,
  "total": 17521,
  "count": 30,
  "page": 1,
  "next": true,
  "previous": false,
  "source": "Kenya Master Health Facility Registry (KMHFR)",
  "source_url": "https://kmhfr.health.go.ke",
  "from_cache": false,
  "data": [
    {
      "id": "5c7fdd4d-...",
      "code": 24749,
      "name": "Kenyatta National Hospital",
      "facility_type": "National Referral Hospital",
      "keph_level": "6",
      "county": "Nairobi",
      "sub_county": "Langata",
      "ward": "Woodley/Kenyatta Golf Course",
      "operation_status": "Operational",
      "owner_category": "Public",
      "open_24hrs": true,
      "has_beds": true,
      "latitude": -1.3006,
      "longitude": 36.8073
    }
  ]
}
```

## Pagination

With 17,521 facilities, always paginate:
- Default page size: 30
- Maximum page size: 100
- Navigate: `?page=2&page_size=50`

The response includes a `next` boolean field indicating whether more pages exist.

## Caching

Results are cached server-side for 24 hours per query combination. The `from_cache` field in every response shows whether the data was freshly fetched or served from cache. Cache resets on server restart.

## API Token

The proxy requires a `KMHFR_API_TOKEN` environment variable to authenticate with the KMHFR API. Without it, proxy endpoints return a `503` error. The static endpoints (`/types` and `/keph-levels`) work without a token. Tokens are available from the Ministry of Health KMHFR team at https://kmhfr.health.go.ke.

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
