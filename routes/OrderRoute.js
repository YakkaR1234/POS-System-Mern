const express=require('express');
const router=express.Router();

const OrderController=require('../controller/OrderController');

router.post('/create',OrderController.saveOrder);
router.get('/get/:id',OrderController.findOrder);
router.get('/get',OrderController.loadAllOrder);
router.put('/update/:id',OrderController.updateOrder);
router.delete('/delete/:id',OrderController.deleteOrder);


module.exports=router;