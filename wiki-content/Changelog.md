# Changelog

## 2026 — Health Facilities Endpoint

- **Health Facilities endpoint** — live proxy to KMHFR (17,521+ registered facilities)
- Filters: `?county=`, `?facility_type=`, `?keph_level=`, `?owner_category=`, `?open_24hrs=`, `?has_beds=`
- County lookup (`/county/:county_id`), search, and static reference routes (`/types`, `/keph-levels`)
- 24-hour server-side cache per query; requires `KMHFR_API_TOKEN` env var

## 2026 — Rivers Endpoint

- **Rivers endpoint** — 12 major rivers with length, source, mouth, and drainage system
- Filters: `?drainage_system=`, `?sort=length_desc|length_asc`
- County lookup (`/county/:county_id`), drainage system route (`/drainage/:system`), and full-text search
- Global search updated to include rivers

## 2026 — Lakes Endpoint

- **Lakes endpoint** — 18 named lakes across Kenya (Rift Valley, Nyanza, Coast, Central Highlands)
- Filters: `?type=`, `?rift_valley=true`, `?transboundary=true`, `?sort=size_desc|size_asc`
- County lookup (`/county/:county_id`) and full-text search
- Global search updated to include lakes

## 2026 — Parastatals Endpoint

- **Parastatals endpoint** — 246 Kenya state corporations across 16 sectors (State Corporations Act, Cap 446)
- Sector filter, `is_university` flag, free-text search, and `/sectors` breakdown
- Universities cross-referenced between `/parastatals` and `/institutions`
- Global search updated to include parastatals

## 2026 — Major Expansion

- **Wards endpoint** — 1,263 wards across 45 counties (IEBC/HDX CC0 dataset)
- **Presidents endpoint** — All 5 Heads of State since 1964, plus optional pre-republic period
- **Parks & Reserves endpoint** — 35 KWS-managed protected areas
- **Postal Codes endpoint** — County and constituency postal codes for all 47 counties
- **Live Exchange Rates** — Switched from static CBK data to live mid-market rates via open.er-api.com, cached hourly
- **Educational Institutions expanded** — 53 universities (41 public + 12 private) and 620+ TVET institutions
- **Global Search** — Cross-resource search across all datasets via `/api/v1/search`
- **7-language code examples** — Interactive docs now show cURL, JavaScript, Python, PHP, Go, Ruby, and Java for every endpoint
- **Try It buttons** — Live fetch against the real API directly from the docs page
- **SEO overhaul** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap.xml, robots.txt
- **Mobile responsive** — Documentation site fully responsive on mobile

## 2025 — Initial Launch

- Counties, Constituencies, Holidays, Population, Exchange Rates (static), Institutions, Ministries
- Interactive map on homepage with live county stats on hover
- Landing page and documentation site launched
- Deployed on Netlify (static frontend + serverless functions)

---

[← Home](Home)
