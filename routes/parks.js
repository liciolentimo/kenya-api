const express = require('express');
const router = express.Router();
const {
  getAllParks,
  getParkById,
  getParksByCounty,
  getParksByType,
  searchParks,
} = require('../controllers/parksController');

router.get('/search', searchParks);
router.get('/county/:county_id', getParksByCounty);
router.get('/type/:type', getParksByType);
router.get('/', getAllParks);
router.get('/:id', getParkById);

module.exports = router;
