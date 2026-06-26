const express = require('express');
const router = express.Router();
const {
  getAllLakes,
  getLakeById,
  getLakesByCounty,
  searchLakes,
} = require('../controllers/lakesController');

router.get('/search', searchLakes);
router.get('/county/:county_id', getLakesByCounty);
router.get('/', getAllLakes);
router.get('/:id', getLakeById);

module.exports = router;
