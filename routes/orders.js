const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Importa el controlador

router.get('/seguimiento', orderController.getOrders); // Asegúrate de que 'getOrders' exista y esté exportado

module.exports = router;