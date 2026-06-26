const express = require('express');
const router = express.Router();
const {
  getAllRivers,
  getRiverById,
  getRiversByCounty,
  getRiversByDrainageSystem,
  searchRivers,
} = require('../controllers/riversController');

router.get('/search', searchRivers);
router.get('/county/:county_id', getRiversByCounty);
router.get('/drainage/:system', getRiversByDrainageSystem);
router.get('/', getAllRivers);
router.get('/:id', getRiverById);

module.exports = router;
