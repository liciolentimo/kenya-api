const express = require('express');
const router = express.Router();
const {
  getAllParastatals,
  getParastatalById,
  getParastatalsBySector,
  searchParastatals,
  getSectorList,
} = require('../controllers/parastatalsController');

router.get('/search', searchParastatals);
router.get('/sectors', getSectorList);
router.get('/sector/:sector', getParastatalsBySector);
router.get('/', getAllParastatals);
router.get('/:id', getParastatalById);

module.exports = router;
