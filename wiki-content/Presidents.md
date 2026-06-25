# Presidents

All 5 Kenyan Heads of State since the republic was established on 12 December 1964. Includes an optional pre-republic entry for the 1963–64 constitutional monarchy period. Sourced from Wikipedia and Kenyan constitutional records.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/presidents` | All 5 presidents (1964–present) |
| GET | `/api/v1/presidents/incumbent` | Current sitting president |
| GET | `/api/v1/presidents/:id` | Single president by ID (1–5) |
| GET | `/api/v1/presidents/search?q=` | Search by name, party, deputies, or description |

## Query Parameters (GET /presidents)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `party` | string | Filter by political party | `?party=KANU` |
| `include_pre_republic` | boolean | Include 1963–64 constitutional monarchy period | `?include_pre_republic=true` |

## Data Model

```json
{
  "id": 5,
  "order": 5,
  "name": "William Ruto",
  "full_title": "President of Kenya",
  "birth_year": 1966,
  "death_year": null,
  "took_office": "2022-09-13",
  "left_office": null,
  "time_in_office": "Incumbent",
  "political_party": "UDA",
  "deputies": ["Rigathi Gachagua", "Kithure Kindiki"],
  "died_in_office": false,
  "is_incumbent": true,
  "image_url": "",
  "description": "Kenya's fifth and current president, Ruto took office in September 2022 after serving as deputy president under Uhuru Kenyatta.",
  "source": "https://en.wikipedia.org/wiki/List_of_heads_of_state_of_Kenya"
}
```

## Kenya's Presidents

| # | Name | Party | Term |
|---|------|-------|------|
| 1 | Jomo Kenyatta | KANU | 1964–1978 |
| 2 | Daniel arap Moi | KANU | 1978–2002 |
| 3 | Mwai Kibaki | NARC/PNU | 2002–2013 |
| 4 | Uhuru Kenyatta | TNA/Jubilee | 2013–2022 |
| 5 | William Ruto | UDA | 2022–present |

## Example Requests

```bash
# All presidents
curl https://kenya-api.netlify.app/api/v1/presidents

# Current president
curl https://kenya-api.netlify.app/api/v1/presidents/incumbent

# Single president
curl https://kenya-api.netlify.app/api/v1/presidents/1

# Filter by party
curl "https://kenya-api.netlify.app/api/v1/presidents?party=KANU"

# Include pre-republic period
curl "https://kenya-api.netlify.app/api/v1/presidents?include_pre_republic=true"

# Search
curl "https://kenya-api.netlify.app/api/v1/presidents/search?q=kenyatta"
```

## Example Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 5,
      "order": 5,
      "name": "William Ruto",
      "full_title": "President of Kenya",
      "birth_year": 1966,
      "death_year": null,
      "took_office": "2022-09-13",
      "left_office": null,
      "time_in_office": "Incumbent",
      "political_party": "UDA",
      "deputies": ["Rigathi Gachagua", "Kithure Kindiki"],
      "died_in_office": false,
      "is_incumbent": true
    }
  ]
}
```

---

[← Home](Home) | [Endpoints Overview](Endpoints-Overview)
