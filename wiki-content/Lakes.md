# Lakes

Kenya's 18 named lakes spanning the Great Rift Valley, Nyanza, the Coast, and the Central Highlands. Includes surface area, lake type, Rift Valley membership, transboundary status, and key features. Sourced from 33travels.com (2026).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/lakes` | All 18 lakes (filterable, sortable) |
| GET | `/api/v1/lakes/:id` | Single lake by ID (1–18) |
| GET | `/api/v1/lakes/county/:county_id` | Lakes in a specific county |
| GET | `/api/v1/lakes/search?q=` | Search by name, key feature, description, or county |

## Query Parameters (GET /lakes)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `type` | string | Filter by lake type | `?type=Freshwater` |
| `rift_valley` | boolean | Return only Rift Valley lakes | `?rift_valley=true` |
| `transboundary` | boolean | Return only lakes shared with neighbouring countries | `?transboundary=true` |
| `sort` | string | Sort by surface area | `?sort=size_desc` or `?sort=size_asc` |

## Lake Types

| Type | Description |
|------|-------------|
| `Freshwater` | Fresh, non-saline lakes |
| `Saline/Alkaline` | Soda and alkaline lakes (most Rift Valley lakes) |
| `Crater Lake` | Volcanic crater lakes |

## Data Model

```json
{
  "id": 1,
  "name": "Lake Victoria",
  "county_ids": [42],
  "counties": ["Kisumu"],
  "region": "Nyanza",
  "surface_area_km2": 68800,
  "lake_type": "Freshwater",
  "key_feature": "Africa's largest lake; Nile source",
  "description": "Lake Victoria is the largest lake in Africa by surface area, a vital freshwater lake shared by Kenya, Uganda, and Tanzania.",
  "is_rift_valley": false,
  "transboundary": true,
  "shared_with": ["Uganda", "Tanzania"],
  "source": "https://33travels.com/lakes-in-kenya/"
}
```

## All 18 Lakes

| # | Name | Type | Region | Area (km²) | Rift Valley |
|---|------|------|--------|-----------|-------------|
| 1 | Lake Victoria | Freshwater | Nyanza | 68,800 | No |
| 2 | Lake Turkana | Saline/Alkaline | Rift Valley | 6,405 | Yes |
| 3 | Lake Naivasha | Freshwater | Rift Valley | 139 | Yes |
| 4 | Lake Nakuru | Saline/Alkaline | Rift Valley | 188 | Yes |
| 5 | Lake Baringo | Freshwater | Rift Valley | 130 | Yes |
| 6 | Lake Bogoria | Saline/Alkaline | Rift Valley | 32 | Yes |
| 7 | Lake Elementaita | Saline/Alkaline | Rift Valley | 10 | Yes |
| 8 | Lake Magadi | Saline/Alkaline | Rift Valley | 100 | Yes |
| 9 | Lake Jipe | Freshwater | Coast | 30 | No |
| 10 | Lake Chala | Crater Lake | Coast | 9 | No |
| 11 | Lake Logipi | Saline/Alkaline | Rift Valley | 5 | Yes |
| 12 | Lake Oloidien | Saline/Alkaline | Rift Valley | 4 | Yes |
| 13 | Lake Sonachi | Crater Lake | Rift Valley | 1 | Yes |
| 14 | Lake Simbi Nyaima | Crater Lake | Nyanza | 0.70 | No |
| 15 | Lake Ol Bolossat | Freshwater | Central Kenya | 4 | No |
| 16 | Lake Kanyaboli | Freshwater | Nyanza | 20 | No |
| 17 | Lake Wamithi | Freshwater | Central Kenya | 2 | No |
| 18 | Lake Sare | Freshwater | Nyanza | 1 | No |

## Example Requests

```bash
# All 18 lakes
curl https://kenya-api.netlify.app/api/v1/lakes

# Largest first
curl "https://kenya-api.netlify.app/api/v1/lakes?sort=size_desc"

# Rift Valley lakes only
curl "https://kenya-api.netlify.app/api/v1/lakes?rift_valley=true"

# Freshwater lakes only
curl "https://kenya-api.netlify.app/api/v1/lakes?type=Freshwater"

# Transboundary lakes (shared with Uganda/Tanzania)
curl "https://kenya-api.netlify.app/api/v1/lakes?transboundary=true"

# Single lake (Lake Turkana)
curl https://kenya-api.netlify.app/api/v1/lakes/2

# Lakes in Nakuru county
curl https://kenya-api.netlify.app/api/v1/lakes/county/32

# Search by feature
curl "https://kenya-api.netlify.app/api/v1/lakes/search?q=flamingo"
```

## Example Response — All Lakes

```json
{
  "success": true,
  "count": 18,
  "data": [
    {
      "id": 1,
      "name": "Lake Victoria",
      "county_ids": [42],
      "counties": ["Kisumu"],
      "region": "Nyanza",
      "surface_area_km2": 68800,
      "lake_type": "Freshwater",
      "key_feature": "Africa's largest lake; Nile source",
      "is_rift_valley": false,
      "transboundary": true,
      "shared_with": ["Uganda", "Tanzania"]
    }
  ]
}
```

## Example Response — Search

```json
{
  "success": true,
  "query": "flamingo",
  "count": 6,
  "data": [
    { "id": 4, "name": "Lake Nakuru", "key_feature": "Renowned for flamingo flocks; national park" },
    { "id": 6, "name": "Lake Bogoria", "key_feature": "Hot springs and geysers; flamingo populations" }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
