module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log('pls login');
        return res.redirect('/login');
    }
    next();
}

module.exports.isNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log('Already Logged in');
        return res.redirect('/dashboard');
    }
    next();
}

