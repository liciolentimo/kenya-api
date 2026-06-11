// routes/institutions.js

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

// Static/named paths FIRST
router.get('/search', searchInstitutions);
router.get('/universities', getUniversities);
router.get('/tvets', getTVETs);
router.get('/county/:county_id', getInstitutionsByCounty);
router.get('/type/:type', getInstitutionsByType);

// Wildcard LAST
router.get('/', getAllInstitutions);
router.get('/:id', getInstitutionById);

module.exports = router;