# Global Search

KenyaAPI supports cross-resource search through a single endpoint. Query all resources simultaneously or narrow by type.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/search?q=` | Search across all resources |
| GET | `/api/v1/search?q=&type=` | Search within a specific resource type |

## Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `q` | string | Yes | Search term (min 2 characters) | `?q=nairobi` |
| `type` | string | No | Limit results to one resource type | `?type=counties` |

## Supported Type Values

| Type value | Resource |
|------------|----------|
| `counties` | Counties — searches name, headquarters, region, governor, description |
| `constituencies` | Constituencies — searches name, county_name |
| `holidays` | Holidays — searches name, type |
| `institutions` | Institutions — searches name, type, category, county_name, address |
| `ministries` | Ministries — searches ministry name, cabinet_secretary |
| `exchange_rates` | Exchange Rates — searches currency code, currency_name |
| `wards` | Wards — searches ward name, sub_county_name, county_name |
| `parks` | Parks — searches name, famous_for, region, description |
| `presidents` | Presidents — searches name, political_party, deputies, description |
| `postal_codes` | Postal Codes — searches county_name, primary_postal_code |
| `parastatals` | Parastatals — searches name, sector, abbreviation |

## Example Requests

```bash
# Search everything for "nairobi"
curl "https://kenya-api.netlify.app/api/v1/search?q=nairobi"

# Search only counties
curl "https://kenya-api.netlify.app/api/v1/search?q=coast&type=counties"

# Search only ministries
curl "https://kenya-api.netlify.app/api/v1/search?q=health&type=ministries"

# Search exchange rates by currency code
curl "https://kenya-api.netlify.app/api/v1/search?q=USD&type=exchange_rates"

# Search parks
curl "https://kenya-api.netlify.app/api/v1/search?q=masai&type=parks"

# Search presidents
curl "https://kenya-api.netlify.app/api/v1/search?q=kenyatta&type=presidents"
```

## Example Response

```json
{
  "success": true,
  "count": 3,
  "data": {
    "counties": [
      { "id": 47, "name": "Nairobi", "region": "Nairobi", "governor": "Johnson Sakaja", "governor_party": "UDA" }
    ],
    "wards": [
      { "id": 1200, "ward": "Nairobi West", "sub_county_name": "Langata", "county_name": "Nairobi" }
    ],
    "constituencies": [
      { "id": 290, "name": "Nairobi West", "county_name": "Nairobi" }
    ]
  }
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
