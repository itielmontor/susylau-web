const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/perfil', profileController.getProfile);

module.exports = router;
