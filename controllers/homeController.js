const db = require('../config/db');

exports.getHome = (req, res) => {
    const queryDestacados = 'SELECT * FROM productos WHERE destacado = TRUE';

    db.query(queryDestacados, (err, destacados) => {
        if (err) {
            console.error('Error obteniendo productos destacados:', err);
            return res.status(500).send('Error al obtener los productos destacados.');
        }

        res.render('home', { destacados, title: 'Inicio' });
    });
};
