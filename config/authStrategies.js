const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/authUserModel')
const Employee = require('../models/employeeModel')
module.exports = function (passport) {
    passport.use('local-user',
        new LocalStrategy({usernameField: "email"}, function (email, password, done) {
            User.findOne({email: email})
                .then(user => {
                    if (!user) {
                        return done(null, false, ({message: 'Email not exist'}))
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, ({message: 'Password incorrect'}))
                        }
                    })
                }).catch(err => console.log(err))

        })
    )
    passport.use('local-employee',
        new LocalStrategy({usernameField:"email"}, function (email, password, done){
            Employee.findOne({email:email})
                .then(user=>{
                    if(!user){
                        return done(null, false,({message:'employee not exist'}))
                    }
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if (err) throw err
                        if(isMatch){
                            return done(null, user)
                        }
                        else {
                            return done(null, false, 'password or email is incorrect')
                        }
                    })
                }).catch(err=>console.log(err))
        })
    )
    function SessionConstructor(userId, userGroup){
        this.userId = userId;
        this.userGroup = userGroup;
    }
    passport.serializeUser(function(user, done) {
        let userGroup = 'users';
        let userPrototype = Object.getPrototypeOf(user)
        if(userPrototype === User.prototype){
            userGroup = 'users';
        }else if(userPrototype === Employee.prototype){
            userGroup = 'employees'
        }

        let sessionConstructor = new SessionConstructor(user.id, userGroup)
         done(null, sessionConstructor);
    });
    passport.deserializeUser(function(sessionConstructor, done) {
        if (sessionConstructor.userGroup === 'users') {
            User.findById(sessionConstructor.userId).then(user => done(null, user));
        } else if (sessionConstructor.userGroup === 'employees') {
            Employee.findById(sessionConstructor.userId).then(employee =>  done(null, employee));
        }
    });
}
