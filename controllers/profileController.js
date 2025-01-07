exports.getProfile = (req, res) => {
    const user = req.session.user || null;

    if (!user) {
        return res.render('profile', { user: null, role: 'guest', title: 'Perfil' });
    }

    const role = user.role === 'admin' ? 'admin' : 'user';
    res.render('profile', { user, role, title: 'Perfil' });
};
