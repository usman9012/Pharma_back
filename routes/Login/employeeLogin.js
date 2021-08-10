let express = require('express');
let router = express.Router();
const passport = require('passport')

router.get('/login-employee', function(req, res, next) {
    res.render('employeeLogin');
})
router.post('/login-employee', function (req, res, next) {
    passport.authenticate('local-employee', function (err, user, info){
        if(err){
            return next(err)
        }
        if(!user)
        {
            console.log("employee not exist")
            return res.render('login')
        }
        req.logIn(user,function (err){
            if(err){return next(err)}
            req.session.isLoggedIn = true
            req.session.user = user
            req.session.save(err=>{
                console.log(err)
                if (req.isAuthenticated()) {
                    return res.redirect('/employeeMenu')
                }
                console.log('employee not exist')
                return res.render('login')
            })
        })
    })(req, res, next)
})


router.get('/employeeMenu', isLoggedIn, (req, res) => {
    res.render('employeeMenu', {
        user: req.user, isLoggedIn: req.isLogged,


    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        req.isLogged = true
        return next();
    }
    else{
        req.isLogged = false
        return next()
    }
}
module.exports = isLoggedIn
module.exports = router
