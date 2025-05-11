const express = require('express');
const { ingestNews } = require('../controllers/newsIngestController');

const router = express.Router();

router.post('/ingest', ingestNews);

module.exports = router;
