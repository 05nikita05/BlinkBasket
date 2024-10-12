const express = require('express');
const router = express.Router();
const {productModel,validateProduct}=require('../models/productModel');
const upload = require('../config/multer_config')

router.use(express.json())
router.get('/',async function(req,res){
    let prods =await productModel.find();
    res.send(prods)
})
router.post('/', function(req,res){
    let {name,price,category,stock,description,image}= req.body;
    let ans =  validateProduct({name,price,category,stock,description,image})
    res.send(ans);
})

module.exports=router;