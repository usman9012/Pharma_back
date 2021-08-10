const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy(function (err){
        if(err){
            console.log(err)
        }else {
            res.cookie("connect.sid",'',{expires:new Date()})
            return res.redirect('/')
        }
    })
})

module.exports = router