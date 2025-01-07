const db = require('../config/db');

exports.getOrders = (req, res) => {
    const clientesId = req.session.user ? req.session.user.id : null;

    if (!clientesId) {
        return res.redirect('/login');
    }

    const query = 'SELECT * FROM pedidos WHERE cliente_id = ? ORDER BY fecha DESC';

    db.query(query, [clientesId], (err, pedidos) => {
        if (err) throw err;
        res.render('orders', { pedidos, title: 'Seguimiento de Pedidos' });
    });
};
