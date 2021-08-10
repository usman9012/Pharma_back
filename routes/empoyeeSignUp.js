const express = require('express')
const router = express.Router()
const Employee = require('../models/employeeModel')
const bcrypt = require('bcrypt')

router.get('/employee', (req, res)=>{
    res.render('employee')
})
router.post('/employee', function (req, res, next){
    const {First_name, Last_name, email, contactNo, password} = req.body

    let newEmployee = Employee({
        First_name,
        Last_name,
        email,
        contactNo,
        password,
    })
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newEmployee.password, salt, (err, hash)=>{
            if(err)throw err

            else {
                newEmployee.password = hash

                newEmployee.save()
                    .then(()=>console.log('employee created'))
                    .catch(err=>console.log(err))
                res.render('index')
            }
        })
    })
})

module.exports = router