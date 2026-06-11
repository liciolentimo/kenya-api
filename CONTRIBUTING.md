# Contributing to KenyaAPI

Thanks for your interest in contributing. KenyaAPI is a public-data project — corrections to data, new endpoints, and documentation improvements are all welcome.

---

## What you can contribute

- **Data corrections** — wrong county figures, outdated exchange rates, missing institutions, etc.
- **New data sets** — any Kenya public data that fits the project's scope and has a verifiable source
- **New endpoints** — filtering, sorting, or aggregation on existing data
- **Bug fixes** — broken routes, incorrect response shapes, validation gaps
- **Documentation** — clearer docs.html descriptions, README improvements, code comments

---

## Getting started

```bash
git clone https://github.com/liciolentimo/kenya-api.git
cd kenya-api
npm install
npm start          # http://localhost:3000
npm run dev        # auto-restart on file changes
```

---

## Project structure

```
kenya-api/
├── app.js                  # Express app
├── server.js               # Entry point
├── routes/                 # One file per resource
├── controllers/            # Business logic, reads from data/
├── data/                   # JSON flat files — the source of truth
├── middleware/             # errorHandler, notFound
├── public/                 # index.html, docs.html
├── scripts/                # Data build and validation scripts
└── tests/                  # Jest + Supertest tests
```

---

## Making changes

### Data corrections

Edit the relevant file in `data/` directly — `counties.json`, `holidays.json`, etc. Include a source URL in your PR description.

After editing, run the validation script:

```bash
node scripts/validateData.js
```

All checks must pass before you submit.

### New endpoints

1. Add business logic to the relevant file in `controllers/`
2. Register the route in `routes/` — **static named paths must come before `/:id`**
3. Update `public/docs.html` with the new endpoint card
4. Update `README.md` endpoints table
5. Add or update a test in `tests/`

### Code style

- `async/await` only — no `.then()` chains or raw callbacks
- Controllers handle logic; routes only wire paths to controllers
- Always call `next(error)` — never swallow errors
- No magic numbers — add constants to `config/`

Run the linter before pushing:

```bash
npm run lint
```

---

## Tests

```bash
npm test
```

Write at least one test for any new endpoint. Tests live in `tests/` and use Jest + Supertest against the Express app directly (no network calls).

---

## Submitting a pull request

1. Fork the repo and create a branch: `git checkout -b fix/county-population`
2. Make your changes
3. Run `node scripts/validateData.js` and `npm test` — both must be clean
4. Open a PR against `main` with a short description and, for data changes, a link to your source

---

## Data standards

| Field | Rule |
|-------|------|
| IDs | Integers, sequential within each dataset, never reused |
| Dates | ISO 8601 — `YYYY-MM-DD` |
| Currency amounts | Numbers, not strings |
| County IDs | Must match `counties.json` (1–47) |
| Sources | All data must have a verifiable public source |

---

## License

By contributing you agree that your changes will be released under the [MIT License](LICENSE).
