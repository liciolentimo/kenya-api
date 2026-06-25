const express = require('express');
const router = express.Router();
const {
  getAllPresidents,
  getPresidentById,
  getIncumbentPresident,
  searchPresidents,
} = require('../controllers/presidentsController');

router.get('/search', searchPresidents);
router.get('/incumbent', getIncumbentPresident);
router.get('/', getAllPresidents);
router.get('/:id', getPresidentById);

module.exports = router;
