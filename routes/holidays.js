const express = require('express');
const { getHolidays, getHolidayById } = require('../controllers/holidaysController');

const router = express.Router();

router.get('/', getHolidays);
router.get('/:id', getHolidayById);

module.exports = router;
