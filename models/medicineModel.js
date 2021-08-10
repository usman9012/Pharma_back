let mongoose = require('mongoose')
let Scheme = mongoose.Schema
const mongooseDate = require('mongoose-date-format')
const medicineSchema = new Scheme({
    name:{
        type:String,
        required:true,
        unique: true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    power:{
        type: String,
        required:true
    },
    medicinePic:{
        type:String,
    },
    expiryDate:{
        type:Date,
        required:true
    }

})
medicineSchema.plugin(mongooseDate)
Medicine = mongoose.model('Medicine', medicineSchema)
module.exports = Medicine