const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema({
    order:{
        type:Object,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    extraChangers:{
        type:Array,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    transactionDetails:{
        type:Object,
        required:true
    },
});

module.exports=mongoose.model('Payment',PaymentSchema);