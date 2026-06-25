# Population

Population data is sourced from the Kenya National Bureau of Statistics (KNBS) 2019 Census — the most recent official census available.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/population` | National population summary |
| GET | `/api/v1/population/counties` | Population breakdown by all 47 counties |

## Data Model

```json
{
  "county_id": 1,
  "county_name": "Mombasa",
  "population": 1208333
}
```

## Example Requests

```bash
# National summary
curl https://kenya-api.netlify.app/api/v1/population

# Per-county breakdown
curl https://kenya-api.netlify.app/api/v1/population/counties
```

## Example Response — National Summary

```json
{
  "success": true,
  "count": 1,
  "data": {
    "total_population": 47564296,
    "census_year": 2019,
    "source": "Kenya National Bureau of Statistics"
  }
}
```

## Example Response — Counties

```json
{
  "success": true,
  "count": 47,
  "data": [
    { "county_id": 1, "county_name": "Mombasa", "population": 1208333 },
    { "county_id": 2, "county_name": "Kwale", "population": 866820 }
  ]
}
```

> Population figures are from the 2019 census. The 2019 census is the most recent publicly available KNBS count. The next census is expected in 2029.

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
