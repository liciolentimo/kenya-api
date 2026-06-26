# KenyaAPI Wiki

**KenyaAPI** is a free, open REST API providing structured public data about Kenya — counties, constituencies, wards, holidays, population, exchange rates, educational institutions, government ministries, national parks, postal codes, presidents, state corporations, and lakes.

No API key or sign-up required.

---

## Quick Links

| | |
|--|--|
| 🌐 **Live API** | https://kenya-api.netlify.app/api/v1 |
| 📖 **Interactive Docs** | https://kenya-api.netlify.app/docs.html |
| 💻 **Source Code** | https://github.com/liciolentimo/kenya-api |
| ☕ **Support** | https://buymeacoffee.com/liciolentimo |

---

## Getting Started

- [Getting Started](Getting-Started) — your first request in 30 seconds
- [Authentication](Authentication) — no auth needed
- [Rate Limiting](Rate-Limiting) — 100 req/min per IP
- [Error Handling](Error-Handling) — status codes and error shapes

## Endpoints

| Resource | Endpoints | Description |
|----------|-----------|-------------|
| [Counties](Counties) | `/api/v1/counties` | All 47 counties with governors, regions, and flags |
| [Constituencies](Constituencies) | `/api/v1/constituencies` | All 290 constituencies |
| [Wards](Wards) | `/api/v1/wards` | 1,263 electoral wards across 45 counties |
| [Population](Population) | `/api/v1/population` | KNBS 2019 Census — national and per-county |
| [Holidays](Holidays) | `/api/v1/holidays` | Public holidays with optional year filter |
| [Exchange Rates](Exchange-Rates) | `/api/v1/exchange-rates` | Live KES rates for 25 currencies, refreshed hourly |
| [Institutions](Institutions) | `/api/v1/institutions` | 53 universities and 620+ TVET institutions |
| [Ministries](Ministries) | `/api/v1/ministries` | All 22 cabinet ministries and their secretaries |
| [Parks & Reserves](Parks-and-Reserves) | `/api/v1/parks` | 35 KWS-managed protected areas |
| [Presidents](Presidents) | `/api/v1/presidents` | All 5 Kenyan heads of state since 1964 |
| [Postal Codes](Postal-Codes) | `/api/v1/postal-codes` | County and constituency postal codes |
| [Lakes](Lakes) | `/api/v1/lakes` | 18 named lakes — Rift Valley, Nyanza, Coast, and Highlands |
| [Rivers](Rivers) | `/api/v1/rivers` | 12 major rivers with length, source, mouth, and drainage system |
| [Parastatals](Parastatals) | `/api/v1/parastatals` | 246 state corporations across 16 sectors |
| [Global Search](Global-Search) | `/api/v1/search` | Cross-resource search across all datasets |

## Reference

- [Code Examples](Code-Examples)
- [Data Sources](Data-Sources)
- [FAQ](FAQ)
- [Contributing](Contributing)
- [Changelog](Changelog)
