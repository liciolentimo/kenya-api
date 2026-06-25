# Holidays

Kenya's public holidays as defined by the Public Holidays Act. Data includes the date, day of the week, and type for each holiday.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/holidays` | All public holidays |
| GET | `/api/v1/holidays?year=2025` | Holidays filtered by year |
| GET | `/api/v1/holidays/:id` | Single holiday by ID |

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `year` | number | Filter holidays by year | `?year=2025` |

## Data Model

```json
{
  "id": 1,
  "name": "New Year's Day",
  "date": "2025-01-01",
  "day": "Wednesday",
  "type": "National"
}
```

## Holiday Types

- **National** — statutory public holiday observed across Kenya
- **Religious** — holidays tied to religious observance (e.g. Christmas, Eid al-Fitr)

## Example Requests

```bash
# All holidays
curl https://kenya-api.netlify.app/api/v1/holidays

# Holidays in 2025
curl "https://kenya-api.netlify.app/api/v1/holidays?year=2025"

# Single holiday
curl https://kenya-api.netlify.app/api/v1/holidays/1
```

## Example Response

```json
{
  "success": true,
  "count": 13,
  "data": [
    {
      "id": 1,
      "name": "New Year's Day",
      "date": "2025-01-01",
      "day": "Wednesday",
      "type": "National"
    },
    {
      "id": 2,
      "name": "Good Friday",
      "date": "2025-04-18",
      "day": "Friday",
      "type": "Religious"
    }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
