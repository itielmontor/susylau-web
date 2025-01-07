const db = require('../config/db');

exports.addToCart = (req, res) => {
    const { id, nombre, precio, tipo, cantidad = 1 } = req.body;

    // Verificar si el producto ya está en el carrito
    const existingItem = req.session.cart.find(item => item.id === parseInt(id));

    if (existingItem) {
        existingItem.cantidad += parseInt(cantidad);
    } else {
        req.session.cart.push({ id: parseInt(id), nombre, precio: parseFloat(precio), tipo, cantidad: parseInt(cantidad) });
    }

    res.redirect('/carrito');
};

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    res.render('cart', { cart, total, title: 'Carrito' });
};

exports.checkout = (req, res) => {
    const clienteId = req.session.user ? req.session.user.id : null; // Utiliza cliente_id en lugar de usuario_id
    const cart = req.session.cart;

    if (!cart || cart.length === 0) {
        return res.redirect('/carrito');
    }

    const productos = JSON.stringify(cart);
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const query = 'INSERT INTO pedidos (cliente_id, productos, total) VALUES (?, ?, ?)';
    db.query(query, [clienteId, productos, total], (err) => {
        if (err) throw err;

        req.session.cart = []; // Vaciar el carrito después del pedido
        res.render('success', { title: 'Pago Exitoso' });
    });
};

exports.updateQuantity = (req, res) => {
    const { id, cantidad } = req.body;

    const item = req.session.cart.find(item => item.id === id);
    if (item) {
        item.cantidad = parseInt(cantidad);
    }

    res.redirect('/carrito');
};

exports.removeFromCart = (req, res) => {
    const { id } = req.body;
    console.log('Producto a eliminar:', id); // Verifica el ID recibido
    req.session.cart = req.session.cart.filter(item => item.id !== id);
    res.redirect('/carrito');
    console.log('Carrito actualizado:', req.session.cart);
};
