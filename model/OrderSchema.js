const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
    products:{
        type:Array,
        required:true,
    
    },
    total:{
        type:Number,
        required:true
    },
    custmer:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },

});

module.exports=mongoose.model('Order',OrderSchema);