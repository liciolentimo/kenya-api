const express = require('express');
const { getAllMinistries, getMinistryById, searchMinistries } = require('../controllers/ministriesController');

const router = express.Router();

router.get('/', getAllMinistries);
router.get('/search', searchMinistries);
router.get('/:id', getMinistryById);

module.exports = router;
