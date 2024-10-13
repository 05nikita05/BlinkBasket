require("dotenv").config();
const express = require('express');
const router = express.Router();
const {adminModel} = require('../models/adminModel');
const {productModel,validateProduct} = require('../models/productModel');
const {categoryModel,validateCategory}= require('../models/categoryModel');


const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validateAdmin = require('../middlewares/admin');


if(typeof process.env.NODE_ENV !== undefined && 
    process.env.NODE_ENV === "development"){
        router.get('/create', async function(req, res){
        
            try{
                let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash("admin",salt);

            let user = new adminModel({
                name:"nikita",
                email:"nikita@gmail.com",
                password:hash,
                role:"Admin",

            })
            await user.save();

            let token = jwt.sign({email: "nikita@gmail.com",admin:true},process.env.JWT_KEY);
            res.cookie("token",token);
            res.send("admin created successfully");
            }
            catch(err){
                res.send(err.message);
            }
        })
}

router.get('/login',(req,res)=>{
    res.render('admin_login')
})
router.post('/login',async(req,res)=>{
    let {email,password} = req.body;
    let admin = await adminModel.findOne({email});
    if(!admin) return res.send("admin not found");

    let valid = await bcrypt.compare(password, admin.password);
    if(valid){
        let token = jwt.sign({email: "nikita@gmail.com",admin:true},process.env.JWT_KEY);
            res.cookie("token",token);
            res.redirect("/admin/dashboard");
    }
})

router.get('/dashboard',validateAdmin,async(req,res)=>{
    let prodcount = await productModel.countDocuments();
    let categcount = await categoryModel.countDocuments();

    res.render('admin_dashboard',{prodcount,categcount});
})

router.get('/products',validateAdmin,async(req,res)=>{
    
    const result = await productModel.aggregate([
        
        {
          // Group products by category name and push each product into an array
          $group: {
            _id: '$category',
            products: { $push: '$$ROOT' }
          }
        },
        {
          // Slice the array of products to include only the first 10 products in each category
          $project: {
            _id:0,
            category: '$_id',
            products: { $slice: ['$products', 10] }
          }
        },
        
      ]);
      
      // Convert the result into an object
const formattedResult = result.reduce((acc, item) => {
    acc[item.category] = item.products; // Assign the category name as key
    return acc;
  }, {});
  
//   console.log(formattedResult);
    res.render('admin_products',{products:formattedResult})

})

router.get('/logout',validateAdmin,(req,res)=>{
    res.cookie("token","");
    res.redirect("admin_login");
})



module.exports = router;