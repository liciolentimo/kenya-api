# Frequently Asked Questions

**Is KenyaAPI free?**

Yes, completely free with no API key required.

---

**Is there a rate limit?**

Yes, 100 requests per minute per IP. See [Rate Limiting](Rate-Limiting).

---

**Can I use this in production?**

Yes. The API is deployed on Netlify's serverless infrastructure with automatic scaling. For mission-critical apps that need guaranteed uptime SLAs, consider self-hosting using the [open-source code](https://github.com/liciolentimo/kenya-api).

---

**Where does the exchange rate data come from?**

Live mid-market rates from [open.er-api.com](https://open.er-api.com), cached for 1 hour. Not the official CBK indicative rate. See [Exchange Rates](Exchange-Rates) for details.

---

**How current is the data?**

- Most reference data (counties, constituencies, wards, parks) is stable and rarely changes.
- Population is from the 2019 KNBS census — the most recent publicly available count.
- Cabinet and governor data reflects 2024 and 2022 appointments respectively.
- Exchange rates are live, refreshed hourly.
- See [Data Sources](Data-Sources) for the full breakdown.

---

**Can I filter or search results?**

Yes. Most endpoints support query parameters for filtering and the [Global Search](Global-Search) endpoint (`/api/v1/search?q=`) searches across all resources at once.

---

**Are ward data available for all 47 counties?**

No. The upstream IEBC/HDX dataset (CC0) is missing Nairobi, Kericho, and Bomet. Those three counties have no ward data in this API.

---

**Can I contribute data corrections?**

Yes — see [Contributing](Contributing).

---

**Who built this?**

[Licio Lentimo](https://liciolentimo.com). Consider [buying a coffee](https://buymeacoffee.com/liciolentimo) if KenyaAPI helps your project!

---

[← Home](Home)
