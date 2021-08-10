const express = require('express')
const router = express.Router()

router.get('/order-Medicine', (req, res)=>{
    res.render('orderMedicine')
})

router.post('/order-Medicine', function (req, res, ){

})

module.exports = router