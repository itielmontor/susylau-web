const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importar el controlador

// Ruta para la página de login
router.get('/login', authController.getLoginPage);

// Ruta para la página de registro
router.get('/register', authController.getRegisterPage);

// Ruta para manejar el inicio de sesión
router.post('/login', authController.login);

// Ruta para manejar el registro de usuarios
router.post('/register', authController.register);

module.exports = router;
