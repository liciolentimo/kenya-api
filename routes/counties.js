const express = require('express');
const { getCounties, getCountyById } = require('../controllers/countiesController');

const router = express.Router();

router.get('/', getCounties);
router.get('/:id', getCountyById);

module.exports = router;
