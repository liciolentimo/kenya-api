# Getting Started

KenyaAPI is a free, open REST API. No registration, no API key, no setup — just make a GET request.

## Base URL

```
https://kenya-api.netlify.app/api/v1
```

## No API Key Required

All endpoints are publicly accessible. Just make a GET request:

```bash
curl https://kenya-api.netlify.app/api/v1/counties
```

## Response Format

Every successful response follows this shape:

```json
{
  "success": true,
  "count": 47,
  "data": [ ... ]
}
```

Errors follow this shape:

```json
{
  "success": false,
  "error": "County with ID 99 not found",
  "statusCode": 404
}
```

## Your First Request

```bash
# Get all counties
curl https://kenya-api.netlify.app/api/v1/counties

# Get a single county
curl https://kenya-api.netlify.app/api/v1/counties/47

# Search across everything
curl "https://kenya-api.netlify.app/api/v1/search?q=nairobi"
```

## Next Steps

- See the full [Endpoints Overview](Endpoints-Overview)
- Try the [interactive docs](https://kenya-api.netlify.app/docs.html) with live code examples in 7 languages
- Check [Rate Limiting](Rate-Limiting) before going to production

---

[← Home](Home)
