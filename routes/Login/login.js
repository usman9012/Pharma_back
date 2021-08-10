let express = require('express');
let router = express.Router();
const passport = require('passport')
const profilePic = require("../../models/profileImgModel");


const isLoggedIn = require('../../middlewares/isLoggedIn');

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login');
})

router.post('/login', function (req, res, next) {
    passport.authenticate('local-user', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            console.log('User not exist')
            return res.render('login')
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err)
            }
            req.session.isLoggedIn = true
            req.session.user = user
            req.session.save(err => {
                console.log(err)
                if (req.isAuthenticated()) {
                    return res.redirect('/customerMenu');
                }
                console.log('user not exist')
                return res.render('login')
            })
        })
    })(req, res, next)
})


module.exports = router
