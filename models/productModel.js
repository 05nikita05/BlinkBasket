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
        type: Boolean,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true });


// Joi Validation Schema
const productValidationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().hex().length(24).required(), // ObjectId reference to 'category'
    stock: Joi.boolean().required(),
    description: Joi.string().required(),
    image: Joi.string().required() // URL validation for the image
});

module.exports = {
    productModel : mongoose.model('Product', productSchema),
    productValidationSchema
};
