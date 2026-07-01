const express = require('express');
const router = express.Router();
const {
  listFacilities,
  getFacility,
  getFacilitiesByCounty,
  getFacilityTypes,
  getKephLevels,
  searchFacilities,
} = require('../controllers/healthFacilitiesController');

router.get('/search', searchFacilities);
router.get('/types', getFacilityTypes);
router.get('/keph-levels', getKephLevels);
router.get('/county/:county_id', getFacilitiesByCounty);
router.get('/', listFacilities);
router.get('/:code', getFacility);

module.exports = router;
