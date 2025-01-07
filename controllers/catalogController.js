const db = require('../config/db');

exports.getCatalog = (req, res) => {
    const queryProductos = 'SELECT * FROM productos';
    const queryPaquetes = `
        SELECT p.*, GROUP_CONCAT(pr.nombre SEPARATOR ', ') AS productos
        FROM paquetes p
        JOIN paquete_productos pp ON p.id = pp.paquete_id
        JOIN productos pr ON pp.producto_id = pr.id
        GROUP BY p.id
    `;

    db.query(queryProductos, (err, productos) => {
        if (err) throw err;

        db.query(queryPaquetes, (err, paquetes) => {
            if (err) throw err;

            res.render('catalog', { productos, paquetes, title: 'Catálogo' });
        });
    });
};



exports.savePreferences = (req, res) => {
    const { productoId, alergias, preferencias } = req.body;

    console.log(`Producto ID: ${productoId}`);
    console.log(`Alergias seleccionadas: ${alergias}`);
    console.log(`Preferencias seleccionadas: ${preferencias}`);

    // Aquí puedes implementar la lógica para guardar en la BD si es necesario.

    res.redirect('/catalogo');
};
