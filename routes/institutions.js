const express = require('express');
const {
  getAllInstitutions,
  getInstitutionById,
  getInstitutionsByCounty,
  getInstitutionsByType,
  searchInstitutions,
} = require('../controllers/institutionsController');

const router = express.Router();

router.get('/', getAllInstitutions);
router.get('/search', searchInstitutions);
router.get('/county/:county_id', getInstitutionsByCounty);
router.get('/type/:type', getInstitutionsByType);
router.get('/:id', getInstitutionById);

module.exports = router;
