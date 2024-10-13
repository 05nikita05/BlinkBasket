const express = require('express');
const router = express.Router();
const {productModel,validateProduct}=require('../models/productModel');
const {categoryModel,validateCategory}=require('../models/categoryModel')
const upload = require('../config/multer_config')
const validateAdmin = require('../middlewares/admin')

router.use(express.json())
router.get('/',async function(req,res){
    let prods =await productModel.find();
    res.send(prods)
})
router.get('/delete/:id',validateAdmin, async function(req,res){
    console.log(req.user.admin)
    if(req.user.admin){
        let prods =await productModel.findOneAndDelete({_id:req.params.id});
        return res.redirect('/admin/products')
    }
    res.send("you are not allowed to delete this product")
})
router.post('/delete',validateAdmin, async function(req,res){
    if(req.user.admin){
        let prods =await productModel.findOneAndDelete({_id:req.body.product_id});
        return res.redirect('back')
    }
    res.send("you are not allowed to delete this product")
})
router.post('/',upload.single("image"),async function(req,res){
    console.log(req.body)
    let {name,price,category,stock,description,image}= req.body;
    let { error } =  validateProduct({name,price,category,stock,description,image})
    if(error) return res.send(error.message)

    console.log(req.file)

    let isCategory = await categoryModel.findOne({name:category});
    if(!isCategory) await categoryModel.create({name:category});


    await productModel.create({
        name,
        price,
        category,
        stock,
        description,
        image: req.file.buffer
    })
    res.redirect('/admin/dashboard')
})

module.exports=router;