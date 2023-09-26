const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.addUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({username: username, email: email});
        const userRegister = await User.register(user, password);
        req.login(userRegister, (err) => {
            if (err) {next(err)}
            req.flash('Success', 'Welcome to YelpCamp!!');
            res.redirect('/campgrounds');
        })
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Login Success!!')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err){
            next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds')
    });
}