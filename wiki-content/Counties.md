# Counties

Kenya has 47 counties established by the 2010 Constitution. The counties endpoint provides detailed data including governors, regions, area, population, and flags.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/counties` | All 47 counties |
| GET | `/api/v1/counties/:id` | Single county by numeric ID |
| GET | `/api/v1/counties/governors` | Lightweight directory of all 47 governors |
| GET | `/api/v1/counties/:id/constituencies` | All constituencies in a county |
| GET | `/api/v1/counties/:id?include=wards` | County with sub-counties and wards attached |

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `region` | string | Filter by region | `?region=Coast` |
| `governor_party` | string | Filter by governor's party | `?governor_party=UDA` |
| `q` | string | Full-text search across name and description | `?q=coast` |
| `sort` | string | Sort results | `?sort=population_desc` |
| `include` | string | Attach related data | `?include=wards` |

## Data Model

```json
{
  "id": 1,
  "code": "001",
  "name": "Mombasa",
  "headquarters": "Mombasa City",
  "area_km2": 212.5,
  "region": "Coast",
  "governor": "Abdullswamad Nassir",
  "governor_party": "ODM",
  "governor_since": 2022,
  "flag_url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Flag_of_Mombasa_County.svg",
  "description": "A coastal county along the Indian Ocean in southeastern Kenya, known for tourism, luxurious beach hotels, and the historic Mombasa Old Town.",
  "postal_code": "80100",
  "postal_code_range": "80100-80118",
  "sub_county_count": 6,
  "ward_count": 30
}
```

## Example Requests

```bash
# All 47 counties
curl https://kenya-api.netlify.app/api/v1/counties

# Single county
curl https://kenya-api.netlify.app/api/v1/counties/1

# Filter by region
curl "https://kenya-api.netlify.app/api/v1/counties?region=Coast"

# Filter by governor party
curl "https://kenya-api.netlify.app/api/v1/counties?governor_party=UDA"

# Full-text search
curl "https://kenya-api.netlify.app/api/v1/counties?q=coast"

# All governors (lightweight)
curl https://kenya-api.netlify.app/api/v1/counties/governors

# Constituencies in Mombasa
curl https://kenya-api.netlify.app/api/v1/counties/1/constituencies
```

## Example Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "code": "001",
      "name": "Mombasa",
      "headquarters": "Mombasa City",
      "area_km2": 212.5,
      "region": "Coast",
      "governor": "Abdullswamad Nassir",
      "governor_party": "ODM",
      "governor_since": 2022,
      "flag_url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Flag_of_Mombasa_County.svg",
      "description": "A coastal county along the Indian Ocean in southeastern Kenya, known for tourism, luxurious beach hotels, and the historic Mombasa Old Town.",
      "postal_code": "80100",
      "postal_code_range": "80100-80118",
      "sub_county_count": 6,
      "ward_count": 30
    }
  ]
}
```

## Regions

Kenya's 47 counties span 8 regions: Coast, North Eastern, Eastern, Central, Rift Valley, Western, Nyanza, and Nairobi.

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
