function isLogggedIn(req, res, next){
    if(req.isAuthenticated()){
        req.isLogged = true
        return next();
    }
    else{
        req.isLogged = false
        return next()
    }
}

module.exports = isLogggedIn;