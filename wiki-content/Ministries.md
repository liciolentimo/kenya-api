# Ministries

Kenya's 22 Cabinet Ministries and their Cabinet Secretaries. Data reflects the 2024 broad-based government formation by President William Ruto. Sourced from the Office of the President ([president.go.ke](https://www.president.go.ke/cabinet/)).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/ministries` | All 22 ministries and Cabinet Secretaries |
| GET | `/api/v1/ministries/:id` | Single ministry by ID |
| GET | `/api/v1/ministries/search?q=` | Search by ministry name or CS name |

## Query Parameters (GET /ministries)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `appointed` | string/number | Filter by appointment year | `?appointed=2022` |
| `q` | string | Full-text search | `?q=health` |

## Data Model

```json
{
  "id": 1,
  "ministry": "Foreign and Diaspora Affairs",
  "cabinet_secretary": "Dr. Musalia Mudavadi E.G.H.",
  "title": "Prime Cabinet Secretary and Cabinet Secretary",
  "appointed": "2022",
  "image_url": "https://www.president.go.ke/wp-content/uploads/Mudavadi.jpg",
  "ministry_website": "https://www.mfa.go.ke",
  "source": "https://www.president.go.ke/cabinet/"
}
```

## Example Requests

```bash
# All ministries
curl https://kenya-api.netlify.app/api/v1/ministries

# Single ministry
curl https://kenya-api.netlify.app/api/v1/ministries/1

# Search by name or CS
curl "https://kenya-api.netlify.app/api/v1/ministries/search?q=health"

# Filter by appointment year
curl "https://kenya-api.netlify.app/api/v1/ministries?appointed=2022"
```

## Example Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "ministry": "Foreign and Diaspora Affairs",
      "cabinet_secretary": "Dr. Musalia Mudavadi E.G.H.",
      "title": "Prime Cabinet Secretary and Cabinet Secretary",
      "appointed": "2022",
      "image_url": "https://www.president.go.ke/wp-content/uploads/Mudavadi.jpg",
      "ministry_website": "https://www.mfa.go.ke",
      "source": "https://www.president.go.ke/cabinet/"
    }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
