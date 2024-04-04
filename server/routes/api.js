const router = require('express').Router();

router.use('/upload', require('./api/upload'));

module.exports = router;