const express = require('express')
const router = express.Router()
const Medicine = require('../../models/medicineModel')

router.get('/allMedicine', (req, res)=>{
    Medicine.find()
        .then(medicines=>{
            res.render('allMedicine',{
                medicine: medicines
            })
        })
        .catch(err=>{
            console.log(err)
        })
})

module.exports = router

