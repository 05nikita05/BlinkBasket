require("dotenv").config();
const express = require('express');
const router = express.Router();
const {adminModel} = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


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

            let token = jwt.sign({email: "nikita@gmail.com"},process.env.JWT_KEY);
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
        let token = jwt.sign({email: "nikita@gmail.com"},process.env.JWT_KEY);
            res.cookie("token",token);
            res.redirect("/admin/dashboard");
    }
})

router.get('/dashboard',(req,res)=>{
    res.render('admin_login')
})
module.exports = router;