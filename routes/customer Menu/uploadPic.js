const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const profilePic = require('../../models/profileImgModel')

router.use(express.static(__dirname+"./public/"))

let Storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:(req, file , cb)=>{
        cb(null, file.filename+"_"+Date.now()+path.extname(file.originalname))
    }
})

let upload = multer({
    storage: Storage
}).single('file')

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
router.get('/profilePic', isLoggedIn, function (req, res, next) {
    profilePic.findOne({_id: req.user }, (err, imgData) => { //change <USER_ID> appropiately
        if (err) {
            console.log(err);
        } else {
            res.render('profilePic', {user: req.user, isLoggedIn: req.isLogged});
        }
    })
})






router.post('/profilePic',upload,  function (req, res, next){
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