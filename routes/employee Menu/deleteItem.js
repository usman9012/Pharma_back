const express = require('express')
const router = express.Router()
const Medicine = require('../../models/medicineModel')

router.get('/all-Medicine',(req, res)=>{
    Medicine.find()
        .then(medicines=>{
            res.render('deleteMedicine', {medicine:medicines})
        })
})
router.post('/all-Medicine', function (req, res){
    const {list} = req.body
    Medicine.deleteOne({"name": list}, function (err, result){
        if(err)
            throw err
        res.redirect('/all-Medicine')
    })



})

module.exports = router