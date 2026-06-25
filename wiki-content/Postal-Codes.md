# Postal Codes

Postal codes for all 47 counties and their constituencies. Sourced from Posta Kenya and postzipcode.com.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/postal-codes` | All 47 county postal codes with constituency breakdowns |
| GET | `/api/v1/postal-codes/county/:county_id` | Postal codes for a single county |
| GET | `/api/v1/postal-codes/constituency?name=` | Lookup by constituency name (partial match) |
| GET | `/api/v1/postal-codes/search?q=` | Search by county name, constituency name, or code |

## Data Model

```json
{
  "id": 1,
  "county_id": 1,
  "county_name": "Mombasa",
  "postal_code_range": {
    "from": "80100",
    "to": "80118"
  },
  "primary_postal_code": "80100",
  "constituencies": [
    { "name": "Changamwe", "postal_code": "80100" },
    { "name": "Jomvu",     "postal_code": "80104" },
    { "name": "Kisauni",   "postal_code": "80107" },
    { "name": "Likoni",    "postal_code": "80110" },
    { "name": "Mvita",     "postal_code": "80100" },
    { "name": "Nyali",     "postal_code": "80118" }
  ],
  "source": "https://postzipcode.com/kenya/mombasa/"
}
```

## Example Requests

```bash
# All county postal codes
curl https://kenya-api.netlify.app/api/v1/postal-codes

# Mombasa county postal codes
curl https://kenya-api.netlify.app/api/v1/postal-codes/county/1

# Lookup by constituency name
curl "https://kenya-api.netlify.app/api/v1/postal-codes/constituency?name=Westlands"

# Search
curl "https://kenya-api.netlify.app/api/v1/postal-codes/search?q=80100"
```

## Example Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "county_id": 1,
      "county_name": "Mombasa",
      "postal_code_range": { "from": "80100", "to": "80118" },
      "primary_postal_code": "80100",
      "constituencies": [
        { "name": "Changamwe", "postal_code": "80100" },
        { "name": "Jomvu", "postal_code": "80104" }
      ]
    }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
