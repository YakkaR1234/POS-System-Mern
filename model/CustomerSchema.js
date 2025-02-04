const mongoose=require('mongoose');

const CusotmerSchema=new mongoose.Schema({
    
    customerName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
})

module.exports=mongoose.model('Customer',CusotmerSchema);