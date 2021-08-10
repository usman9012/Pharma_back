const express = require('express')
const profilePic = require("../../models/profileImgModel");
const router = express.Router()
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
router.get('/customerMenu', isLoggedIn, function (req, res, next) {
    profilePic.findOne({_id: req.user.id }, (err, imgData) => {
        if (err) {
            console.log(err);
        } else {
            res.render('profilePic', {user: req.user, isLoggedIn: req.isLogged, image: imgData.profileImg});
        }
    })
})


router.get('/customerMenu', function (req, res, next){
    res.render('clientMenu')
})

module.exports = router