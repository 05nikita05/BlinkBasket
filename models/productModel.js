const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema and Validation
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: Buffer,
    }
}, { timestamps: true });


// Joi Validation Schema
const validateProduct =(data)=>{
const schema =  Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(3).max(50).required(), // ObjectId reference to 'category'
    stock: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().optional() // URL validation for the image

});
return schema.validate(data);
}
module.exports = {
    productModel : mongoose.model('Product', productSchema),
    validateProduct
};
