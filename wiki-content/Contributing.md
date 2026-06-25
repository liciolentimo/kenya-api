# Contributing

Contributions are welcome! Please read the [Code of Conduct](../blob/main/CODE_OF_CONDUCT.md) before contributing.

## Reporting data issues

If you spot incorrect data (wrong governor, outdated cabinet info, broken endpoint), open an issue on the [main repository](../../issues) with:

- The endpoint affected
- What's incorrect
- A link to an official or verifiable source

## Submitting fixes

1. Fork the repository
2. Create a branch: `git checkout -b fix/county-data`
3. Make your change with a clear commit message
4. Open a Pull Request referencing any source links

## Data standards

All data must come from official or openly licensed sources (IEBC, KNBS, CBK, government ministries, CC0/CC-BY datasets). See [Data Sources](Data-Sources) for the current source list.

## Adding new endpoints

If you want to add a new resource endpoint:

1. Add a JSON data file under `/data/`
2. Create a route file under `/routes/`
3. Create a controller under `/controllers/`
4. Wire the route in `app.js`
5. Add tests in `/tests/`
6. Update `public/docs.html` with endpoint cards and code examples
7. Update `README.md` and `CLAUDE.md`

---

[← Home](Home)
