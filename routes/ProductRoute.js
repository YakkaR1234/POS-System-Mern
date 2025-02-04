const express=require('express');
const router=express.Router();

const ProductController=require('../controller/ProductController');


router.post('/create',ProductController.saveProduct);
router.put('/update/:id',ProductController.updateProduct);
router.get('/find/:id',ProductController.findProduct);
router.get('/all',ProductController.loadAllProduct);
router.delete('/delete/:id',ProductController.DeleteProduct);
router.get('/lowstock',ProductController.findlowStockProducts);

module.exports=router;