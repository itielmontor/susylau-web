const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Agregar al carrito
router.post('/add-to-cart', cartController.addToCart);

// Mostrar el carrito
router.get('/carrito', cartController.getCart);

// Proceder al pago
router.post('/checkout', cartController.checkout);

router.post('/update-quantity', cartController.updateQuantity);
router.post('/remove-from-cart', cartController.removeFromCart);

module.exports = router;
