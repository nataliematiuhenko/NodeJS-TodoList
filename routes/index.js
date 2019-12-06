const todoRoutes = require('./todoRoutes');
const express = require('express');
const router = express.Router();


router.use('/todos', todoRoutes);

module.exports = router;