const express = require('express');
const router = express.Router();
const {
  getAllPostalCodes,
  getPostalCodeByCounty,
  getPostalCodeByConstituency,
  searchPostalCodes,
} = require('../controllers/postalCodesController');

router.get('/search',             searchPostalCodes);
router.get('/county/:county_id',  getPostalCodeByCounty);
router.get('/constituency',       getPostalCodeByConstituency);
router.get('/',                   getAllPostalCodes);

module.exports = router;
