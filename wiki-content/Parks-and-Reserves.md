# Parks & Reserves

Kenya's 35 protected areas managed by Kenya Wildlife Service (KWS), including national parks, game reserves, marine parks, and sanctuaries. Sourced from KWS and beyondforest.org (2026).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/parks` | All 35 parks and reserves |
| GET | `/api/v1/parks/:id` | Single park by ID |
| GET | `/api/v1/parks/county/:county_id` | Parks in a specific county |
| GET | `/api/v1/parks/type/:type` | Parks filtered by type |
| GET | `/api/v1/parks/search?q=` | Search parks by name, description, or region |

## Query Parameters (GET /parks)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `type` | string | Filter by park type | `?type=National%20Park` |
| `county_id` | number | Filter by county | `?county_id=34` |
| `big_cats` | boolean | Filter parks with lions/cheetahs/leopards | `?big_cats=true` |
| `marine` | boolean | Filter marine parks | `?marine=true` |
| `most_visited` | boolean | Filter top-visited parks | `?most_visited=true` |

## Park Types

- National Park
- National Reserve
- Marine National Park
- Marine National Reserve
- Sanctuary

## Data Model

```json
{
  "id": 1,
  "name": "Aberdare National Park",
  "type": "National Park",
  "county_ids": [19, 21, 18],
  "counties": ["Nyeri", "Murang'a", "Nyandarua"],
  "region": "Central Kenya",
  "famous_for": "Mountains, waterfalls, bongos",
  "description": "A high-altitude park covering the Aberdare mountain range, home to rare mountain bongos, elephants, black rhinos, and spectacular waterfalls.",
  "size_km2": 767,
  "managed_by": "Kenya Wildlife Service (KWS)",
  "big_cats": true,
  "marine": false,
  "most_visited": false,
  "coordinates": { "lat": -0.3922, "lng": 36.7318 },
  "source": "https://www.beyondforest.org/..."
}
```

## Example Requests

```bash
# All parks
curl https://kenya-api.netlify.app/api/v1/parks

# Single park
curl https://kenya-api.netlify.app/api/v1/parks/1

# Parks with big cats
curl "https://kenya-api.netlify.app/api/v1/parks?big_cats=true"

# Marine parks
curl "https://kenya-api.netlify.app/api/v1/parks?marine=true"

# Most visited parks
curl "https://kenya-api.netlify.app/api/v1/parks?most_visited=true"

# National Parks only
curl "https://kenya-api.netlify.app/api/v1/parks/type/National%20Park"

# Parks in Kajiado county
curl https://kenya-api.netlify.app/api/v1/parks/county/34

# Search parks
curl "https://kenya-api.netlify.app/api/v1/parks/search?q=amboseli"
```

## Example Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Aberdare National Park",
      "type": "National Park",
      "county_ids": [19, 21, 18],
      "counties": ["Nyeri", "Murang'a", "Nyandarua"],
      "region": "Central Kenya",
      "famous_for": "Mountains, waterfalls, bongos",
      "description": "A high-altitude park covering the Aberdare mountain range...",
      "size_km2": 767,
      "managed_by": "Kenya Wildlife Service (KWS)",
      "big_cats": true,
      "marine": false,
      "most_visited": false,
      "coordinates": { "lat": -0.3922, "lng": 36.7318 }
    }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
