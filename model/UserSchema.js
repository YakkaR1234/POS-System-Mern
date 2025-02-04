const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        undefined:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    role:{
        type:Array,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    },
})

module.exports=mongoose.model('Users',UserSchema);