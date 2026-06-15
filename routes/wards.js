const express = require('express');
const router = express.Router();
const {
  getAllWards,
  getWardsByCounty,
  getWardsBySubCounty,
  searchWards,
  getSubCountiesByCounty,
} = require('../controllers/wardsController');

// Static paths before wildcards
router.get('/search',                  searchWards);
router.get('/county/:county_id',       getWardsByCounty);
router.get('/sub-county',              getWardsBySubCounty);
router.get('/sub-counties/:county_id', getSubCountiesByCounty);
router.get('/',                        getAllWards);

module.exports = router;
