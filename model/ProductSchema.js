const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        undefined:true
    },
    Discription:{
        type:String,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    qtyOnHand:{
        type:Number,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    },
    images:{
        type:Array,
        required:true
    }
});

ProductSchema.static.findlowStockProducts=function(){
    return this.find({
        qtyOnHand:{$lt:10}
    })
}

module.exports=mongoose.model('Products',ProductSchema);