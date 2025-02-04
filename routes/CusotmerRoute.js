const express=require('express');
const router=express.Router();

const CustomerController=require('../controller/CustomerController');

router.post('/save',CustomerController.saveCustomer);
router.put('/update/:id',CustomerController.updatecustomer);
router.get('/find/:id',CustomerController.findCustomer);
router.get('/all',CustomerController.loadAllcustomer);
router.delete('/delete/:id',CustomerController.DeleteCustomer);

module.exports=router;