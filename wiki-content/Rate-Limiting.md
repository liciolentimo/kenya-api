# Rate Limiting

KenyaAPI enforces a rate limit of:

**100 requests per minute, per IP address**

## What happens if I exceed the limit?

You'll receive a `429 Too Many Requests` response:

```json
{
  "success": false,
  "error": "Too many requests. Please slow down.",
  "statusCode": 429
}
```

## Best practices

- Cache responses on your end where data doesn't change often (e.g. counties, constituencies, wards)
- Use the [Global Search](Global-Search) endpoint instead of multiple separate calls where possible
- Exchange rates are cached server-side for 1 hour — no need to poll faster than that

---

[← Home](Home)
