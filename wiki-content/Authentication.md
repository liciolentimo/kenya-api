# Authentication

KenyaAPI requires **no authentication and no API key**.

All endpoints are publicly accessible via standard HTTP GET requests.

```bash
curl https://kenya-api.netlify.app/api/v1/counties
```

There is no `Authorization` header, no `X-API-Key`, and no OAuth flow needed.

## Why no auth?

KenyaAPI is built on public data that belongs to Kenyan citizens. Removing auth barriers keeps the API accessible to students, hobbyists, and developers building civic tech without friction.

See [Rate Limiting](Rate-Limiting) for the only usage constraint in place.

---

[← Home](Home)
