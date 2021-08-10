let express = require('express')
let router = express.Router()
const multer = require('multer')
const path = require('path')
const Medicine = require('../../models/medicineModel')
router.use(express.static(__dirname+"./public/"))

let Storage = multer.diskStorage({
    destination: "./public/medicine/",
    filename:(req, file , cb)=>{
        cb(null, file.filename+"_"+Date.now()+path.extname(file.originalname))
    }
})

let upload = multer({
    storage: Storage
}).single("file")


router.get('/medicine', (req, res)=>{
    res.render('medicineView', {message: req.flash( 'message')})
})
router.post('/medicine', upload ,function (req,res, next){

    let newMedicine = new Medicine({
        name: req.body.name,
        price: req.body.price,
        power: req.body.power,
        quantity: req.body.quantity,
        expiryDate: req.body.expiryDate,
        medicinePic:  req.body.file.filename

    })
    newMedicine.save()
        .then((result)=>{
            console.log(result)
            res.send(req.flash('message', 'data added successfully'))

        })
        .catch(err=> console.log(err))

    res.render('medicineView')
})

module.exports= router