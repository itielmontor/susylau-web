require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('./config/db');

// Importar rutas
const homeRoutes = require('./routes/home');
const catalogRoutes = require('./routes/catalog');
const cartRoutes = require('./routes/cart');
const profileRoutes = require('./routes/profile');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

// Configurar dotenv
dotenv.config();

const app = express();

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'susylau-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware para inicializar el carrito
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// Usar rutas
app.use(authRoutes);
app.use(homeRoutes);
app.use(catalogRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);
app.use(profileRoutes);
app.use(orderRoutes);

// Probar conexión a la base de datos
db.query('SELECT 1', (err, results) => {
    if (err) throw err;
    console.log('Base de datos conectada');
});

// Ruta raíz
app.get('/', (req, res) => {
    res.render('index', { title: 'SusyLau' });
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
