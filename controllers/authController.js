const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.getLoginPage = (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
};

exports.getRegisterPage = (req, res) => {
    res.render('register', { title: 'Registro' });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM clientes WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            // Usuario no encontrado
            return res.render('login', { title: 'Iniciar Sesión', error: 'Correo o contraseña incorrectos.' });
        }

        const user = results[0];

        // Comparar contraseñas en texto plano
        if (password !== user.contraseña) {
            // Contraseña incorrecta
            return res.render('login', { title: 'Iniciar Sesión', error: 'Correo o contraseña incorrectos.' });
        }

        // Iniciar sesión
        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            role: 'user',
        };

        res.redirect('/perfil'); // Redirige al perfil
    });
};

exports.register = (req, res) => {
    const { nombre, email, telefono, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10); // Cifrar la contraseña

    const insertUserQuery = 'INSERT INTO clientes (nombre, email, telefono, contraseña) VALUES (?, ?, ?, ?)';
    db.query(insertUserQuery, [nombre, email, telefono, hashedPassword], (err) => {
        if (err) throw err;

        res.redirect('/login');
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
