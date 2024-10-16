const express = require('express');
const router = express.Router();
const {categoryModel,validateCategory}=require('../models/categoryModel')
const validateAdmin = require('../middlewares/admin')

router.use(express.json())

router.post('/create',validateAdmin,async function(req,res){
    let category =await categoryModel.create({
        name:req.body.name
    })
    res.redirect("back")
})

module.exports=router;