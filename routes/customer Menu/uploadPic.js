const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const profilePic = require('../../models/profileImgModel')

const isLoggedIn = require('../../middlewares/isLoggedIn');

let Storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:(req, file , cb)=>{
        cb(null, req.user.id+path.extname(file.originalname))
    }
})

let upload = multer({
    storage: Storage
}).single('file')

router.get('/profilePic', isLoggedIn, function (req, res, next) {
    profilePic.findOne({_id: req.user }, (err, imgData) => { //change <USER_ID> appropiately
        if (err) {
            console.log(err);
        } else {
            res.render('profilePic', {user: req.user, isLoggedIn: req.isLogged});
        }
    })
})

// Render upload pic form
router.get('/uploadPic', (req, res)=>{
    res.render('profilePic', {user: req.user, isLoggedIn: req.isLogged});
})

router.post('/profilePic', upload,  function (req, res, next){
    console.log(req.file.fileName);
    let user = req.user
    let pic = profilePic({
        userId: user,
        profileImg: req.file.filename
    })
    pic.save()
        .then((result)=>console.log(result))
        .catch(err=>console.log(err))
    res.redirect('/customerMenu', 200)
})

module.exports = router