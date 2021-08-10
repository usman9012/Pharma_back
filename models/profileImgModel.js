const mongoose = require('mongoose')
const Users = require("./authUserModel");
const Employee = require("./employeeModel");
const Schema  = mongoose.Schema
const profilePic = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:Users || Employee,
    },
    profileImg:{
        type: String
    }
})
profile = mongoose.model('Profile', profilePic)
module.exports = profile