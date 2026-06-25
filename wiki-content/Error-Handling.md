# Error Handling

KenyaAPI uses standard HTTP status codes.

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 200 | OK | Request succeeded |
| 400 | Bad Request | Missing or invalid query parameter |
| 404 | Not Found | Resource ID doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Live exchange rate provider unreachable |

All errors return:

```json
{
  "success": false,
  "error": "Descriptive error message",
  "statusCode": 404
}
```

## Common errors

**404 — Resource not found**
```bash
curl https://kenya-api.netlify.app/api/v1/counties/99
# {"success":false,"error":"County with ID 99 not found","statusCode":404}
```

**400 — Bad request**
```bash
curl "https://kenya-api.netlify.app/api/v1/institutions/search"
# {"success":false,"error":"Query parameter 'q' is required","statusCode":400}
```

**429 — Rate limit**
```json
{
  "success": false,
  "error": "Too many requests. Please slow down.",
  "statusCode": 429
}
```

---

[← Home](Home)
