<!--
  README LENGTH POLICY:
  Keep this file under ~150 lines. Detailed endpoint
  docs, parameter tables, and examples belong on the
  GitHub Wiki (wiki-content/ folder), not here.
  When adding a new endpoint, update:
    1. wiki-content/<Resource>.md (full docs)
    2. wiki-content/_Sidebar.md (nav link)
    3. wiki-content/Endpoints-Overview.md (table row)
    4. README.md resource count table ONLY
       (one line, not a full section)
-->

# KenyaAPI

Free, open REST API for Kenya's public data — no API key required.

🔗 **Live API:** https://kenya-api.netlify.app/  
📖 **Interactive Docs:** https://kenya-api.netlify.app/docs.html  
📚 **Full Documentation:** [GitHub Wiki](../../wiki)

[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg)](CODE_OF_CONDUCT.md)

---

## What is KenyaAPI?

KenyaAPI consolidates Kenya's public data into one consistent, developer-friendly REST API — no authentication required.

| Resource | Count |
|----------|-------|
| Counties | 47 |
| Constituencies | 290 |
| Wards | 1,263 |
| Lakes | 18 |
| Rivers | 12 |
| Health Facilities | 17,521+ (live from KMHFR) |
| Parks & Reserves | 35 |
| Institutions | 700+ |
| Parastatals | 246 |
| Ministries | 22 |
| Presidents | 5 |
| Exchange Rates | 25 (live) |
| Postal Codes | 47 counties |

**👉 For the complete endpoint reference, parameters, and example responses for every resource, see the [GitHub Wiki](../../wiki).**

---

## Quick Start

```bash
curl https://kenya-api.netlify.app/api/v1/counties
```

Response:
```json
{
  "success": true,
  "count": 47,
  "data": [ ... ]
}
```

No API key. No authentication. Rate limited to 100 requests/minute per IP. See [Rate Limiting](../../wiki/Rate-Limiting) for details.

---

## Tech Stack

- Node.js + Express
- JSON data files (no database)
- Hosted on Netlify (static frontend + serverless functions)

---

## Local Development

```bash
git clone https://github.com/liciolentimo/kenya-api.git
cd kenya-api
npm install
node server.js
```

Server runs on `http://localhost:3000`. See [CLAUDE.md](CLAUDE.md) for project structure and coding conventions.

---

## Documentation

| Where | What |
|-------|------|
| [Interactive Docs](https://kenya-api.netlify.app/docs.html) | Live, runnable code examples in 7 languages |
| [GitHub Wiki](../../wiki) | Full endpoint reference, parameters, data models |
| [CLAUDE.md](CLAUDE.md) | Project structure and conventions for contributors |

---

## Contributing

Contributions are welcome! Please read the [Code of Conduct](CODE_OF_CONDUCT.md) first.

See [Contributing Guide](../../wiki/Contributing) on the wiki for the full workflow and data standards.

---

## Data Sources

KenyaAPI aggregates verified public data from IEBC, KNBS, Central Bank of Kenya, Office of the President, CUE, TVETA, Kenya Wildlife Service, and other official and openly licensed sources. Full breakdown: [Data Sources](../../wiki/Data-Sources) on the wiki.

---

## Support

Built and maintained by **Licio Lentimo**  
🌐 [liciolentimo.com](https://liciolentimo.com)  
☕ [Support this project](https://buymeacoffee.com/liciolentimo)
