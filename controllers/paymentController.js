const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res) => {
    const { carrito } = req.session;

    if (!carrito || carrito.length === 0) {
        return res.redirect('/carrito');
    }

    const lineItems = carrito.map(item => ({
        price_data: {
            currency: 'mxn',
            product_data: {
                name: item.nombre,
                description: item.descripcion
            },
            unit_amount: item.precio * 100, // Stripe maneja precios en centavos
        },
        quantity: item.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/carrito`,
    });

    res.redirect(session.url);
};
