# Rivers

Kenya's 12 major rivers including the Tana, Ewaso Nyiro, and Mara, with length, source, mouth, and drainage system. Sourced from abiri.home.blog (2024).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/rivers` | All 12 rivers (filterable, sortable) |
| GET | `/api/v1/rivers/:id` | Single river by ID (1–12) |
| GET | `/api/v1/rivers/county/:county_id` | Rivers flowing through a specific county |
| GET | `/api/v1/rivers/drainage/:system` | Rivers by drainage system |
| GET | `/api/v1/rivers/search?q=` | Search by name, source, mouth, description, or county |

## Query Parameters (GET /rivers)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `sort` | string | Sort by river length | `?sort=length_desc` or `?sort=length_asc` |
| `drainage_system` | string | Filter by drainage system | `?drainage_system=Lake Victoria Drainage` |

## Drainage Systems

| Value | Description |
|-------|-------------|
| `Indian Ocean Drainage` | Rivers flowing to the Indian Ocean (Tana, Athi, Ewaso Nyiro, Daua) |
| `Lake Victoria Drainage` | Rivers draining into Lake Victoria (Mara, Nzoia, Yala, Gucha, Nyando) |
| `Lake Turkana Drainage` | Rivers draining into Lake Turkana (Kerio, Turkwel) |
| `Lake Natron Drainage` | Rivers draining into Lake Natron across the Tanzanian border (Southern Ewaso Nyiro) |

## Data Model

```json
{
  "id": 1,
  "name": "Tana River",
  "length_km": 1000,
  "source": "Aberdare Ranges and Mount Kenya",
  "mouth": "Indian Ocean",
  "county_ids": [19, 18, 16, 15, 4],
  "counties": ["Nyeri", "Nyandarua", "Machakos", "Kitui", "Tana River"],
  "drainage_system": "Indian Ocean Drainage",
  "is_longest": true,
  "tributary_of": null,
  "description": "Kenya's longest river at approximately 1,000 km...",
  "source_url": "https://abiri.home.blog/rivers-in-kenya/"
}
```

## All 12 Rivers

| # | Name | Length (km) | Drainage System | is_longest |
|---|------|-------------|-----------------|-----------|
| 1 | Tana River | 1,000 | Indian Ocean Drainage | Yes |
| 2 | Ewaso Nyiro | 700 | Indian Ocean Drainage | No |
| 3 | Daua River | 450 | Indian Ocean Drainage | No |
| 4 | Athi-Galana-Sabaki | 390 | Indian Ocean Drainage | No |
| 5 | Mara River | 395 | Lake Victoria Drainage | No |
| 6 | Kerio River | 350 | Lake Turkana Drainage | No |
| 7 | Turkwel River | 340 | Lake Turkana Drainage | No |
| 8 | Nzoia River | 257 | Lake Victoria Drainage | No |
| 9 | Southern Ewaso Nyiro | 220 | Lake Natron Drainage | No |
| 10 | Yala River | 219 | Lake Victoria Drainage | No |
| 11 | Gucha River | 190 | Lake Victoria Drainage | No |
| 12 | Nyando River | 153 | Lake Victoria Drainage | No |

## Example Requests

```bash
# All 12 rivers
curl https://kenya-api.netlify.app/api/v1/rivers

# Sorted by length (longest first)
curl "https://kenya-api.netlify.app/api/v1/rivers?sort=length_desc"

# Lake Victoria drainage rivers
curl "https://kenya-api.netlify.app/api/v1/rivers?drainage_system=Lake Victoria Drainage"

# Single river (Tana River)
curl https://kenya-api.netlify.app/api/v1/rivers/1

# Rivers in Nairobi county (county_id=47)
curl https://kenya-api.netlify.app/api/v1/rivers/county/47

# Rivers by drainage system
curl "https://kenya-api.netlify.app/api/v1/rivers/drainage/Indian%20Ocean%20Drainage"

# Search for Tana
curl "https://kenya-api.netlify.app/api/v1/rivers/search?q=tana"
```

## Example Response — All Rivers

```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1,
      "name": "Tana River",
      "length_km": 1000,
      "source": "Aberdare Ranges and Mount Kenya",
      "mouth": "Indian Ocean",
      "county_ids": [19, 18, 16, 15, 4],
      "counties": ["Nyeri", "Nyandarua", "Machakos", "Kitui", "Tana River"],
      "drainage_system": "Indian Ocean Drainage",
      "is_longest": true,
      "tributary_of": null
    }
  ]
}
```

## Example Response — County Rivers

```json
{
  "success": true,
  "county_id": 47,
  "count": 1,
  "data": [
    {
      "id": 4,
      "name": "Athi-Galana-Sabaki",
      "length_km": 390,
      "source": "Aberdare Ranges",
      "mouth": "Indian Ocean",
      "counties": ["Nairobi", "Machakos", "Taita Taveta", "Kilifi"]
    }
  ]
}
```

## Example Response — Search

```json
{
  "success": true,
  "query": "tana",
  "count": 1,
  "data": [
    { "id": 1, "name": "Tana River", "length_km": 1000, "is_longest": true }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
