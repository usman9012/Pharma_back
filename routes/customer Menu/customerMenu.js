
const express = require('express');
const router = express.Router();
const profilePic = require('../../models/profileImgModel');

const isLoggedIn = require('../../middlewares/isLoggedIn');


router.get('/customerMenu', isLoggedIn, function (req, res) {
    profilePic.findOne({userId: req.user.id }, (err, imgData) => {
        if (err) {
            console.log(err);
        }
        else if (imgData == null || imgData == [] || imgData == undefined){
            // User exists but with no image
            return res.render('clientMenu', {user: req.user, isLoggedIn: req.isLogged, image:null});
        }
        else {
            return res.render('clientMenu', {user: req.user, isLoggedIn: req.isLogged, image:imgData.profileImg});
        }
    })
})

module.exports = router;