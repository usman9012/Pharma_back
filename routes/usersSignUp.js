const express = require('express');
const router = express.Router();
const User = require('../models/authUserModel')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/signup', (req,res) =>{
  res.render('userSignup')
});

router.post('/signup', function (req, res, next){
  const {firstName, lastName, email, password} = req.body

  let newUser = User({
    firstName,
    lastName,
    email,
    password
  })
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt,(err, hash)=>{
      if(err) throw err;

      else{newUser.password = hash

        newUser.save()
            .then(()=>console.log('user created successfully'))
            .catch(err=>console.log(err))

        res.redirect('/', 200)
      }
    })
  })
})
module.exports = router;