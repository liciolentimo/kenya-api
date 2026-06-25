# Constituencies

Kenya has 290 constituencies established by the IEBC (Independent Electoral and Boundaries Commission) based on the 2012 boundaries. Each constituency is mapped to one of the 47 counties.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/constituencies` | All 290 constituencies |
| GET | `/api/v1/constituencies/:id` | Single constituency by ID |

## Data Model

```json
{
  "id": 1,
  "code": "001",
  "name": "Changamwe",
  "county_id": 1,
  "county_name": "Mombasa",
  "postal_code": "80100",
  "wards": [
    "Port Reitz",
    "Kipevu",
    "Airport",
    "Changamwe",
    "Chaani"
  ]
}
```

## Example Requests

```bash
# All constituencies
curl https://kenya-api.netlify.app/api/v1/constituencies

# Single constituency
curl https://kenya-api.netlify.app/api/v1/constituencies/1

# All constituencies in Mombasa (via counties endpoint)
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
      "name": "Changamwe",
      "county_id": 1,
      "county_name": "Mombasa",
      "postal_code": "80100",
      "wards": ["Port Reitz", "Kipevu", "Airport", "Changamwe", "Chaani"]
    }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
