const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    First_name:{
        type: String,
        required:true
    },
    Last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contactNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    joined:{
        type:Date,
        default:Date.now
    }
})
Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee