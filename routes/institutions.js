const express = require('express');
const router = express.Router();
const {
  getAllInstitutions,
  getInstitutionById,
  getInstitutionsByCounty,
  getInstitutionsByType,
  searchInstitutions,
  getUniversities,
  getTVETs,
} = require('../controllers/institutionsController');

// ── Static named routes FIRST ─────────────────────────
// These must appear before /:id or Express matches them
// as ID values (e.g. "tvets" becomes id="tvets")
router.get('/search',            searchInstitutions);
router.get('/universities',      getUniversities);
router.get('/tvets',             getTVETs);

// ── Prefixed param routes ──────────────────────────────
router.get('/county/:county_id', getInstitutionsByCounty);
router.get('/type/:type',        getInstitutionsByType);

// ── Root and wildcard LAST ─────────────────────────────
router.get('/',                  getAllInstitutions);
router.get('/:id',               getInstitutionById);

module.exports = router;
