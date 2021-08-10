const express = require('express')
const router = express.Router()

router.get('/employeeMenu', function (req, res, next){
    res.render('employeeMenu')
})

module.exports = router